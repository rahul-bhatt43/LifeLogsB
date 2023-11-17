import Comment from "../models/comment.js";
import Post from "../models/post.js";

export const createComment = async (req, res) => {
    try {
        const { post: postId, user, body, parentComment, uid } = req.body;

        const commentData = new Comment({
            post: postId,
            user,
            body,
            parentComment, uid
        });

        const savedComment = await commentData.save();

        // If the comment has a parent, update the parent comment to include this as a child
        if (parentComment) {
            await Comment.findByIdAndUpdate(parentComment, { $push: { replies: savedComment._id } });
        }

        // Update the post to include the new comment
        await Post.findByIdAndUpdate(postId, { $push: { comment: savedComment._id } })
            .populate("comment")
            .exec();

        res.status(201).json({
            created: true,
            data: savedComment,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal server error",
        });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const { id } = req.body;

        const response = await Comment.findByIdAndDelete(id);

        if (!response) {
            res.status(400).json({
                success: false,
                message: "No such comment found in directory",
            });
        } else {
            // If the comment had children, recursively delete them and update the post model
            await deleteChildComments(id, response.post);

            // If the comment had a parent, update the parent comment to remove this as a child
            if (response.parentComment) {
                await Comment.findByIdAndUpdate(response.parentComment, { $pull: { replies: id } });
            }

            res.status(200).json({
                success: true,
                message: "Comment deleted successfully",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal server error",
        });
    }
};

// Recursive function to delete child comments and update the post model
const deleteChildComments = async (parentCommentId, postId) => {
    const children = await Comment.find({ parentComment: parentCommentId });

    for (const child of children) {
        await deleteChildComments(child._id, postId);
        await Comment.findByIdAndDelete(child._id);
    }

    // Update the post to remove the deleted comment
    await Post.findByIdAndUpdate(postId, { $pull: { comment: parentCommentId } });
};



export const getCommentById = async (req, res) => {
    try {
        const { id } = req.params;
        // const { id } = req.body;


        const comment = await Comment.findOne({ _id: id });

        if (!comment) {
            res.status(404).json({
                message: "No such comment found",
            });
        } else {
            res.status(200).json({
                data: comment,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal server error",
        });
    }
};

export const updateComment = async (req, res) => {
    try {
        const { id, body } = req.body;

        const updatedComment = await Comment.findByIdAndUpdate(
            { _id: id },
            { body },
            { new: true }
        );

        if (!updatedComment) {
            res.status(404).json({
                message: "No such comment found",
            });
        } else {
            res.status(200).json({
                message: "Comment updated",
                data: updatedComment,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal server error",
        });
    }
};
