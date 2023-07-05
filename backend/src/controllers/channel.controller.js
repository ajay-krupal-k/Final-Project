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

const deleteChannel = async (req,res) => {

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

module.exports = {
    getChannels,
    createChannel,
    deleteChannel
}