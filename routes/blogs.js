import express from "express";

import { createPost, deletePost, getAllPosts, getPostbyId, updatePost } from "../controllers/postController.js";
import { createComment, deleteComment, getCommentById, updateComment } from "../controllers/commentController.js";
import { getAllLikes, likePost, unlikePost } from "../controllers/likeController.js";

const router = express.Router();


router.post('/create', createPost) // create
router.get('/getblogs', getAllPosts) // Read
// router.post('/getblogsbyid/:id',getPostbyId) // post
router.get('/getblogsbyid/:id', getPostbyId) // post
// router.delete('/delete/:id',deletePost) //Delete
router.delete('/delete', deletePost) //Delete
router.put('/updatepost', updatePost) //Update


// Comments

router.post('/comment', createComment); // create the comment
router.delete('/comment/delete', deleteComment); // delete the comment
router.get('/comment/:id', getCommentById); // get the on the basis of Id
// http://localhost:4000/api/v1/comment/65559b45f9bdc81311d9f4db
router.put('/comment/update', updateComment); // update the on the basis of Id

// likes
router.post('/likes/like', likePost);
router.post('/likes/unlike', unlikePost);
router.get('/likes/getAll/:postId', getAllLikes);

export default router;

