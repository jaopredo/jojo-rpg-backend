/* MONGODB */
const Player = require('../database/schemas/PlayerSchema')

module.exports = async (req, res, next) => {
    const { email } = req.body
    if (await Player.findOne({ email })) {
        return res.status(400).json({ error: 'This email already exists' })
    }
    next()
}