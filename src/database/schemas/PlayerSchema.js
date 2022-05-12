const mongoose = require('../connection')

const PlayerSchema = new mongoose.Schema({  // Player Schema
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    accessKey: {
        type: String,
        required: true,
        default: "player",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const Player = mongoose.model('Player', PlayerSchema)

module.exports = Player