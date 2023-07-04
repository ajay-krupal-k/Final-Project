const express = require('express')

const {
    createUser, 
    loginUser,
    logoutUser,
    logoutAll 
} = require('../controllers/user.controller')
const auth = require('../middleware/auth.middleware')

const router = express.Router()

router.post("/register",createUser)

router.post("/login", loginUser)

router.post("/logout", auth, logoutUser)

router.post("/logoutAll", auth, logoutAll)

module.exports = router