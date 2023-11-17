import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

export default async function dbConnect() {
    try {
        await mongoose.connect(process.env.DB_URL);

        console.log("Successfully connected to DB");
    } catch (error) {
        console.log("Issue in Connection to DB");
        console.error(error.message);
        process.exit(1);
    }
}
