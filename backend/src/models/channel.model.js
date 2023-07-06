const mongoose = require('mongoose')

const Schema = mongoose.Schema

const channelSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
}, {timestamps: true})


module.exports = mongoose.model('Channel',channelSchema)