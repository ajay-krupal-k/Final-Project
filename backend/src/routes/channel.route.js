const express = require('express')

const router = express.Router()

// Get all the channels
router.get("/")

// Create a new channel
router.post("/")

// Update a channel
router.patch("/:id")

router.delete("/:id")