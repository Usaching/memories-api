// inside here we create all the for our routes
import express from 'express';
import mongoose from 'mongoose';


import PostMessage from "../models/postMessage.js";
const router = express.Router();

export const getPosts = async (req, res) => {
    try{
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);
    }catch(error) {
        res.status(404).json({ message: error.message });
    }
}

// export const getPost = async (req, res) => { 
//     const { id } = req.params;

//     try {
//         const post = await PostMessage.findById(id);
        
//         res.status(200).json(post);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// }

export const createPost = async (req, res) => {
    // title, message, selectedFile, creator, tags
    const post  = req.body;

    const newPostMessage = new PostMessage(post);

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    // { title, message, creator, selectedFile, tags }
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with that id: ${id}`);

    //  = { creator, title, message, tags, selectedFile, _id: id};
    
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });
    
    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with that id: ${id}`);

    await PostMessage.findByIdAndDelete(id);

    // console.log('DELETE!');

    res.json({ message: 'Post deleted successfully.' });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    
    res.json(updatedPost);
}

export default router;
