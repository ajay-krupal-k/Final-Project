require('dotenv').config()

const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const Schema = mongoose.Schema

const inviteSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: (props) => `${props.value} is not a valid email address`
        }
    },
    status: {
        type: String,
        enum: ['Pending','Accepted'],
        default: 'Pending'
    },
    access: [{
            // type: Schema.Types.ObjectId,
            // ref: 'Channel'
            type: String,
            required: true
    }],
    permissions: [{
        type: String,
        enum: ['read','edit','delete'],
        required: true
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    token: {
        type: String,
    }
}, {timestamps: true})

inviteSchema.methods.generateToken = async function () {

    const user = this;

    const token = jwt.sign({email: user.email}, process.env.PRIVATE_KEY, { expiresIn: '7 days' });

    user.token = token

    await user.save()
    return token
}

module.exports = mongoose.model('Invitation',inviteSchema)