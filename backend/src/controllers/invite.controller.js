const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')

const Invite = require('../models/invite.model')

const getInvites = async (req,res) => {
    const invites = await Invite.find({})

    res.status(200).json(invites)
}

const getInvite = async (req,res) => {

    const id = req.params.id

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Invalid User'})
    }

    const invite = await Invite.findById({_id: new ObjectId(id)})

    if(!invite) {
        return res.status(404).json({error: 'Invalid User'})
    }

    res.status(200).json(invite)
}

const createInvite = async (req,res) => {
    const { name, email, status, access, permissions } = req.body

    try {
        const invite = await Invite.create({ name, email, status, access, permissions })
        res.status(200).json(invite)
    } catch(error) {
        res.status(400).json({ error: error.message })
    }
}

const updateInvite = async (req,res) => {
    const id = req.params.id
    
    const updates = req.body

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Invalid User'})
    }

    try {
        const invite = await Invite.updateOne({_id: new ObjectId(id), $set: updates})
        res.status(200).json(invite)
    } catch(error) {
        res.status(404).json({error: error.message})
    }
}

const deleteInvite = async (req,res) => {
    const id = req.params.id

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Invalid User'})
    }

    try {
        const invite = await Invite.deleteOne({_id: new ObjectId(id)})
        res.status(200).json(invite)
    } catch(error) {
        res.status(404).json({error: error.message})
    }

}

module.exports = {
    getInvites,
    getInvite,
    createInvite,
    updateInvite,
    deleteInvite
}