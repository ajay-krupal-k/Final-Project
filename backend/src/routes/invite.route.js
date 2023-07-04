const express = require('express')

const {
    getInvites,
    getInvite,
    createInvite,
    updateInvite,
    deleteInvite
} = require('../controllers/invite.controller')
const router = express.Router()

router.get("/", getInvites)

router.get("/:id", getInvite)

router.post("/", createInvite)

router.patch("/:id", updateInvite)

router.delete("/:id", deleteInvite)

module.exports = router