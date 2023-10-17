import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    url: { type: String, require: true, unique: true },
});


export const User = mongoose.model("user", userSchema);