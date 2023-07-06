const { ObjectId } = require('mongodb')
const Post = require('../models/post.model')
const mongoose = require('mongoose')

const getPosts = async (req,res) => {
    const posts = await Post.find()

    res.status(200).json(posts)
}

const getPost = async (req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({errir: 'Invalid Post ID'})
    }

    const post = await Post.findById(id)

    if(!post){
        res.status(404).json({errir: 'Cannot find Post'})
    }

    res.status(200).json(post)
}

const getPostsbyChannelId = async (req,res) => {
    const { channelId } = req.params

    if(!mongoose.Types.ObjectId.isValid(channelId)){
        res.status(404).json({errir: 'Invalid Channel ID'})
    }

    const posts = await Post.find({channelId: channelId})

    if(!posts){
        res.status(404).json({errir: 'Cannot find Posts in Channel'})
    }

    res.status(200).json(posts)
}

const createPost = async (req,res) => {
    const { title, description, channelId } = req.body

    try{
        const post = await Post.create({ title, description, channelId })
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const updatePost = async (req,res) => {
    const { id } = req.params

    const updates = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({errir: 'Invalid Post ID'})
    }

    try {
        const post = await Post.updateOne({_id: new ObjectId(id)},{$set: updates})
        res.status(200).json(post)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

const deletePost = async (req,res) => {
    const { id } = req.params

    const updates = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({errir: 'Invalid Post ID'})
    }

    try {
        const post = await Post.deleteOne({_id: new ObjectId(id)})
        res.status(200).json(post)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getPosts,
    getPost,
    getPostsbyChannelId,
    createPost,
    updatePost,
    deletePost
}