// likeController.js

import Like from "../models/like.js";
import Post from "../models/post.js";

export const likePost = async (req, res) => {
    try {
        const { post: postId, user, uid } = req.body;

        const likeData = new Like({
            post: postId,
            user,
            uid,
        });

        const savedLike = await likeData.save();

        
        await Post.findByIdAndUpdate(postId, { $push: { like: savedLike._id } },{new:true})
            .populate("like")
            .exec();

        res.status(201).json({
            liked: true,
            data: savedLike,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal server error",
        });
    }
};

export const unlikePost = async (req, res) => {
    try {
        const { post: postId, user } = req.body;

        const response = await Like.findOneAndDelete({ post: postId, user });

        if (!response) {
            res.status(400).json({
                success: false,
                message: "User has not liked the post",
            });
        } else {
            
            await Post.findByIdAndUpdate(postId, { $pull: { like: response._id } },{new:true})
                .populate("like")
                .exec();

            res.status(200).json({
                unliked: true,
                message: "Post unliked successfully",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal server error",
        });
    }
};

export const getAllLikes = async (req, res) => {
    try {
        const { post: postId } = req.params;

        const likes = await Like.find({ post: postId });

        res.status(200).json({
            likes: likes,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal server error",
        });
    }
};
