import { model, Schema } from "mongoose";
const photoSchema = new Schema({
    label: { type: String, require: true },
    url: { type: String, require: true },
});
const photoListSchema = new Schema({
    _id: { type: String, require: true },
    photos: [photoSchema],
});
export const PhotoList = model("photoList", photoListSchema);
