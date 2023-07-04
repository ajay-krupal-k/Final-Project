// middleware to check if logged in user is valid or not

require('dotenv').config()

const jwt = require('jsonwebtoken')
const Invite = require('../models/invite.model')

const invite = async (req,res,next) => {

    try{
        const token = req.query.token

        if(!token ){
            throw new Error('Not a valid link')
        }

        const decoded = jwt.verify(token,process.env.PRIVATE_KEY)
        const user = await Invite.findOne({email: decoded.email, token: token})

        console.log(user)

        if(!user){
            throw new Error('Not a valid link')
        }

        req.name = user.name
        req.email = decoded.email

        next()
    } catch (error) {
        res.status(400).send({error: 'Not a valid link'})
    }
}

module.exports = invite