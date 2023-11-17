import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    uid:{
        type:String,
        required:true,
    },
    parentComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Comment", commentSchema);
