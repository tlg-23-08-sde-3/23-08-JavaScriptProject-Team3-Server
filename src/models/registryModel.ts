import { model, Schema } from "mongoose";

const itemSchema = new Schema({
    item: { type: String, require: true },
    photo: { type: String },
    url: { type: String, require: true },
});

const registrySchema = new Schema({
    _id: { type: String, require: true },
    registry: [itemSchema],
});

export const RegistryList = model("registryList", registrySchema);
