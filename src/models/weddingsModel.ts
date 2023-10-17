import { model, Schema } from "mongoose";

const weddingSchema = new Schema({
    _id: {type: String},
    name1: { type: String, require: true },
    name2: { type: String, require: true },
    date: { type: String },
    venue: { type: String },
    image: { type: String },
    story: { type: String },
});

export const Wedding = model("wedding", weddingSchema);
