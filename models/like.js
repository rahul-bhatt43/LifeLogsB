import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    uid:{
        type:String,
        required:true,
    },
});

likeSchema.index({ post: 1, user: 1 }, { unique: true });

export default mongoose.model("Like", likeSchema);
