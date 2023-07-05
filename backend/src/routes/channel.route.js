const express = require('express')

const {
    getChannels,
    createChannel,
    deleteChannel
} = require('../controllers/channel.controller')
const auth = require('../middleware/auth.middleware')
const admin = require('../middleware/role.middleware')
const router = express.Router()

// Get all the channels
router.get("/", auth, getChannels)

// Create a new channel
router.post("/", auth, admin, createChannel)

router.delete("/:id", auth, admin, deleteChannel)

module.exports = router