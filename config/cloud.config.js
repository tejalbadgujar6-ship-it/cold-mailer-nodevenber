
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY ?? process.env.CLOUD_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET ?? process.env.CLOUD_API_SECRET;

const missingSettings = [
    ["CLOUDINARY_CLOUD_NAME", cloudName],
    ["CLOUDINARY_API_KEY or CLOUD_API_KEY", apiKey],
    ["CLOUDINARY_API_SECRET or CLOUD_API_SECRET", apiSecret]
].filter(([, value]) => !value).map(([name]) => name);

if (missingSettings.length > 0) {
    throw new Error(`Missing Cloudinary environment variable(s): ${missingSettings.join(", ")}`);
}

cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret
});

export default cloudinary;
