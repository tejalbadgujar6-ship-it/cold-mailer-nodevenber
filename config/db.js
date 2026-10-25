import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const connection = await mongoose.connect(`mongodb+srv://tejalbadgujar2_db_user:fS6zvW7xPqpqbT5O@cluster0.f1xz6gc.mongodb.net/codemailer`);
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error.message);
    }
}
export default connectDB;