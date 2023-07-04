const express = require("express")

const {
    getUsers,
    getUser,
    updateUser,
    deleteUser
} = require("../controllers/user.controller")
const auth = require('../middleware/auth.middleware')
const admin = require('../middleware/role.middleware')

const router = express.Router()

router.get("/", auth, admin, getUsers)

router.get("/:id", auth, getUser)

router.patch("/:id", auth, updateUser)

router.delete("/:id", auth, deleteUser)

module.exports = router