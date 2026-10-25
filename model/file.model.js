// use schema and url for model file
import mongoose from "mongoose";

const fileSchema = mongoose.Schema({
    fileName: {
        type: String,
        required: true
    },
    fileURL: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", //"double codes madhe aapan user model cha reference ghetla ahe, jyane aapan compass adhle user model madhe create zalele user cha reference baghu shakto"
        required: true
    },
    fileURL: {
        type: String,
        required: true
    }
});
const File = mongoose.model("File", fileSchema);
export default File;