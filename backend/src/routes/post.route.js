const express = require('express')

const {
    getPosts,
    getPost,
    getPostsbyChannelId,
    createPost,
    updatePost,
    deletePost
} = require('../controllers/post.controller')
const router = express.Router()

router.get("/",getPosts)

router.get("/:channelId/all",getPostsbyChannelId)

router.get("/:id",getPost)

router.post("/",createPost)

router.patch("/:id",updatePost)

router.delete("/:id",deletePost)

module.exports = router