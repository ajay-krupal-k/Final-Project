require('dotenv').config()

// modules
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

// routes
const authRoute = require('./src/routes/auth.route')
const userRoute = require('./src/routes/user.route')
const inviteRoute = require('./src/routes/invite.route')

// creates a new express application
const app = express()

// middleware
app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()//to execute the next middleware
})

// routes handling
app.use("", authRoute)
app.use("/invites", inviteRoute)
app.use("/users", userRoute)

// Connecting to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Connected to DB and Listening on port 5000")
        })
    })
    .catch((error) => {
        console.log(error.message)
    })

const User = require('./src/models/user.model')

const main = async function () {
    const user = await User.findById('64a5304ffa5204878ee239a2')
    await user.populate('usraccess')
    console.log(user.usraccess[0].access)

}

main()