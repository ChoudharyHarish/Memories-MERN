import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: new Date()
    },
    createdBy: String,
    title: String,
    message: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
    comments: {
        type: [String],
        default: []
    },
    userId: String,
})

const Post = new mongoose.model('Post', PostSchema);

export default Post;