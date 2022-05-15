const mongoose = require('../connection')

const log = require('../../functions/log')

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

PlayerSchema.post('save', function(doc) {
    const logMessage = `Um novo PLAYER criado
    Criado: ${doc.createdAt}
    Email: ${doc.email}
    Id: ${doc.id}`

    log(logMessage, 'player')
})
PlayerSchema.post('deleteOne', function(doc) {
    const logMessage = `Um PLAYER foi deletado
    Id: ${doc.id}
    Email: ${doc.email}
    Deletado: ${new Date()}`

    log(logMessage, 'player')
})

const Player = mongoose.model('Player', PlayerSchema)

module.exports = Player