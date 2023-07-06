const Channel = require('../models/channel.model')
const User = require('../models/user.model')
const Invite = require('../models/invite.model')
const mongoose = require('mongoose')

const getChannels = async (req, res) => {

    if (req.user.role === "admin") {
        const channels = await Channel.find({})
        res.status(200).json({ channels })
    }

    const userAccess = await Invite.findOne({ userId: req.user._id })

    const channelName = await Channel.find({ _id: { $in: userAccess.channels } })
    res.status(200).json({ channelName })
}

const getChannel = async (req, res) => {
    const userAccess = await Invite.findOne({ userId: req.user._id })

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid Channel ID' })
    }

    if (req.user.role === "admin") {
        try {
            const channel = await Channel.findById(id)
            return res.status(200).json(channel)
        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    }

    if ((userAccess.channels).includes(id)) {
        try {
            const channel = await Channel.findById(id)
            return res.status(200).json(channel)
        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    } else {
        return res.status(400).json({ error: "Unauthorized Access" })
    }
}

const createChannel = async (req, res) => {

    const { name, description } = req.body

    try {
        const channel = await Channel.create({ name, description })
        await Channel.find().populate('userId').then(p => console.log(p)).catch(error => console.log(error))
        await res.status(200).json(channel)
    } catch (error) {
        await res.status(400).json({ error: error.message })
    }


}

const deleteChannel = async (req, res) => {

    const id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid User' })
    }

    try {
        const channel = await Channel.deleteOne({ _id: new ObjectId(id) })
        res.status(200).json(channel)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const getPosts = async (req, res) => {
    const { channelId } = req.params

    if (!mongoose.Types.ObjectId.isValid(channelId)) {
        return res.status(404).json({ error: 'Invalid Channel ID' })
    }

    try {
        const channel = await Channel.findById(channelId)
        await channel.populate('posts')
        res.status(200).json(channel.posts)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getChannels,
    getChannel,
    createChannel,
    deleteChannel,
    getPosts
}