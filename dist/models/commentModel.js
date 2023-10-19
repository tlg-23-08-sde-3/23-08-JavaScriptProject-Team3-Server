import { model, Schema } from "mongoose";
const commentSchema = new Schema({
    name: { type: String, require: true },
    comment: { type: String, require: true }
});
const commentListSchema = new Schema({
    _id: { type: String, require: true },
    comments: [commentSchema]
});
export const CommentList = model("CommentList", commentListSchema);
