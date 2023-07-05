const express = require('express')

const {
    getInvites,
    getInvite,
    createInvite,
    updateInvite,
    deleteInvite
} = require('../controllers/invite.controller')
const auth = require('../middleware/auth.middleware')
const admin = require('../middleware/role.middleware')
const router = express.Router()

router.get("/", auth, admin, getInvites)

router.get("/:id", auth, admin, getInvite)

router.post("/", auth, admin, createInvite)

router.patch("/:id", auth, admin, updateInvite)

router.delete("/:id", auth, admin, deleteInvite)

module.exports = router