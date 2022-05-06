const mongoose = require('../connection')

const CharSchema = new mongoose.Schema({
    "basic": {
        "name": {
            type: String,
            required: true,
        },
        "age": {
            type: Number,
            required: true,
        },
        "race": {
            type: String,
            required: true,
        },
        "patent": {
            type: String,
            required: true,
        },
        "ocupation": {
            type: String,
            required: true,
        },
    },
    "attributes": {
        "strengh": Number,
        "dexterity": Number,
        "constituition": Number,
        "education": Number,
        "commonSense": Number,
        "vigillance": Number,
        "charisma": Number,
        "size": Number,
    }
})

const PlayerSchema = new mongoose.Schema({
    "email": {
        type: String,
        required: true,
    },
    "password": {
        type: String,
        required: true,
        select: false,
    },
    "accessKey": {
        type: String,
        required: true,
        default: "player",
    },
    "character": CharSchema
})

const Player = mongoose.model('Player', PlayerSchema)

module.exports = Player