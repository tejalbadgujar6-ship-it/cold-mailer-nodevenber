
import cloudinary from "../config/cloud.config.js";
import User from "../model/auth.model.js";
import File from "../model/file.model.js";

export const uploadFile = async (req, res) => {
    try {
        // 1. Check whether a file is uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }

        // 2. Check whether the file name is provided
        const fileName = req.body.fileName;

        if (!fileName) {
            return res.status(400).json({
                success: false,
                message: "File name is required"
            });
        }

        // 3. Upload the file to Cloudinary
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: "files",
                    resource_type: "auto"
                },
                (error, result) => {
                    if (error) {
                        return reject(error);
                    }

                    resolve(result);
                }
            );

            // Send the file buffer to Cloudinary
            stream.end(req.file.buffer);
        });

        // 4. Save file information in MongoDB
        const file = await File.create({
            fileName: fileName,
            fileURL: result.secure_url,
            createdBy: req.user._id
        });

        // 5. Add the file ID to the user's files array
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $push: {
                    files: file._id
                }
            }
        );

        // 6. Send success response
        return res.status(201).json({
            success: true,
            message: "File uploaded successfully",
            file
        });

    } catch (error) {
        console.error("Error uploading file:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
