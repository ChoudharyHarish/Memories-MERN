import mongoose from "mongoose";

export const connectDB = (url) => {
    mongoose.set('strictQuery', true);
    mongoose.connect(url);
}