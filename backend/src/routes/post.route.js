const express = require('express')

const {
    getPosts,
    getPost,
    getPostsbyChannelId,
    createPost,
    updatePost,
    deletePost
} = require('../controllers/post.controller')
const auth = require('../middleware/auth.middleware')
const admin = require('../middleware/role.middleware')

const router = express.Router()

router.get("/", auth, admin, getPosts)

router.get("/:channelId/all", auth, getPostsbyChannelId)

router.get("/:id",getPost)

router.post("/", auth, createPost)

router.patch("/:id",updatePost)

router.delete("/:id",deletePost)

module.exports = router