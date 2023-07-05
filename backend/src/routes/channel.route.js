const express = require('express')

const {
    getChannels,
    createChannel,
    deleteChannel
} = require('../controllers/channel.controller')
const auth = require('../middleware/auth.middleware')
const router = express.Router()

// Get all the channels
router.get("/", auth, getChannels)

// Create a new channel
router.post("/",createChannel)

router.delete("/:id",deleteChannel)

module.exports = router