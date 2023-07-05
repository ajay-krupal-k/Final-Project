const Channel = require('../models/channel.model')

const getChannels = async (req,res) => {
    const channels = await Channel.find({})

    res.status(200).json(channels)
}

const createChannel = async (req,res) => {

    const {name, description} = req.body

    try {
        const channel = await Channel.create({ name, description })
        await res.status(200).json(channel)
    } catch(error) {
        await res.status(400).json({error: error.message})
    }


}

module.exports = {
    getChannels,
    createChannel
}