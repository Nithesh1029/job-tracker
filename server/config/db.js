import mongoose from "mongoose";

const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("Connected to DataBase");
    } catch (error) {
        console.error(error.message);
    }
}

export default connectDb;