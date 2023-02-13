import Post from "../models/posts.js";

const getPosts = async (req, res) => {
    const { page } = req.query;
    try {
        const LIMIT = 4;
        // e.g page = 2 then startInd = (2 - 1) * 4 = 4 (0 to 3rd)index posts to first page pe hogi isliye 
        // page = 3   (3-1) * 4 = 8th index will be starting one for 3rd page
        const startInd = (Number(page) - 1) * LIMIT;
        const total = await Post.countDocuments({});

        //by sorting with _id : -1 we get newest document first 
        const posts = await Post.find().sort({ _id: -1 }).limit(LIMIT).skip(startInd);
        res.status(200).json({ posts, currPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    }
    catch (error) {
        console.log("HERE in all posts");
        console.log(error);
        res.status(500).json(error.message);
    }
}

const getPost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        res.status(202).json(post);
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}

const getPostsByFilter = async (req, res) => {
    const { search, tags } = req.query;
    try {
        //making title case insensitive
        const title = new RegExp(search, 'i');
        const posts = await Post.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] });
        res.status(200).json(posts);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
}


const createPost = async (req, res) => {
    try {
        const post = await Post.create({ ...req.body, userId: String(req.user.userId), createdBy: req.user.name, createdAt: new Date().toISOString() });
        res.status(200).json(post);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
}


const postComment = async (req, res) => {
    const { id } = req.params;
    const { message } = req.body;
    try {
        const post = await Post.findById(id);
        post.comments.push(message);
        const updatePost = await Post.findOneAndUpdate({ _id: id }, post, { new: true })
        res.status(200).json(updatePost);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
}



const updatePost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findOneAndUpdate({ _id: id }, req.body, { new: true });
        res.status(200).json(post);
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findByIdAndDelete(id);
        res.status(200).json({ post, message: "Delete Succesfully" });
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}

const likePost = async (req, res) => {
    const { id } = req.params;
    if (!req.user.userId) return res.status(404).json({ message: "User not authenticated" });
    try {
        const post = await Post.findById(id);
        const findIndexOfUser = post.likes.findIndex((id) => id === String(req.user.userId));
        if (findIndexOfUser === -1) {
            //means this user has not liked post till now therefore will add this user to array and incrementing length
            post.likes.push(req.user.userId);
        }
        else {
            //remove the like of user
            post.likes = post.likes.filter((id) => id != req.user.userId);
        }
        const updatePost = await Post.findOneAndUpdate({ _id: id }, post, { new: true })
        res.status(200).json(updatePost);
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}




export { getPosts, createPost, updatePost, deletePost, likePost, getPostsByFilter, getPost, postComment };