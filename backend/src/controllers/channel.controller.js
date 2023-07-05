const Channel = require('../models/channel.model')
const User = require('../models/user.model')

const getChannels = async (req,res) => {

    if(req.user.role === "admin"){
        const channels = await Channel.find({})
        res.status(200).json({channels})
    }

    const findUser = await User.findById(req.user._id)
    await findUser.populate('usraccess')

    const arr = findUser.usraccess[0].access

    console.log(arr)

    const channelName = await Channel.find({name: {$in: arr}})
    res.status(200).json({channelName})
}

const createChannel = async (req,res) => {

    const {name, description} = req.body

    try {
        const channel = await Channel.create({ name, description })
        await Channel.find().populate('userId').then(p => console.log(p)).catch(error => console.log(error))
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