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

channelSchema.virtual("posts",{
    ref: "Post",
    localField: '_id',
    foreignField: "channelId"
})

module.exports = mongoose.model('Channel',channelSchema)