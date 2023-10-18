import { model, Schema } from "mongoose";

const guestSchema = new Schema({
    name: { type: String, require: true },
    attending: { type: String, enum: ["yes", "no", "pending"], default: "pending" },
    plusOne: { type: String, enum: ["yes", "no"] , default: "no"},
});

const guestListSchema = new Schema({
    _id: {type: String, require: true},
    guests: [guestSchema]
});

export const GuestList = model("GuestList", guestListSchema)