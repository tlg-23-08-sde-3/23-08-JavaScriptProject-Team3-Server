import mongoose from "mongoose";

const url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.y0ruign.mongodb.net/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`; /* cspell: disable-line */

export const connect = async () => {
    try {
        mongoose.connect(url);
        console.log("Connected to MongoDB database...");
    } catch (err) {
        console.error("Failed to connect to MongoDB database: ", err);
    }
};
