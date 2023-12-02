import express from "express";
//here we are importing named export
// , likePost, deletePost
import { getPosts, createPost, updatePost, deletePost, likePost } from "../controllers/posts.js";

const router = express.Router();


router.get('/', getPosts);
router.post('/', createPost);
// router.get('/:id', getPost);
router.patch('/:id', updatePost)//patch is used for updating existing document
router.delete('/:id', deletePost);

router.patch('/:id/likePost', likePost);

export default router;