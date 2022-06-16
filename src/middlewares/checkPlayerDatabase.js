/* MONGODB */
const Player = require('../database/schemas/PlayerSchema')

module.exports = async (req, res, next) => {
    const { email } = req.body
    const player = await Player.findOne({ email })
    if (player) return res.json({ error: 'This email already exists' })
    next()
}