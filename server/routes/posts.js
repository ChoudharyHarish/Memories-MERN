import express from 'express';
const router = express.Router();
import authentication from '../middleware/auth.js';

import { getPosts, createPost, updatePost, deletePost, likePost, getPostsByFilter, getPost, postComment } from "../controllers/posts.js";


router.get('/', getPosts);
router.get('/search', getPostsByFilter);
router.get('/:id', getPost);
router.post("/", authentication, createPost);
router.post("/comments/:id", authentication, postComment);
router.patch('/:id', authentication, updatePost);
router.delete("/:id", authentication, deletePost);
router.patch('/likes/:id', authentication, likePost);

export default router;
