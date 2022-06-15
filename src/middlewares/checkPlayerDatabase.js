/* MONGODB */
const Player = require('../database/schemas/PlayerSchema')

module.exports = async (req, res, next) => {
    const { email } = req.body
    if (await Player.findOne({ email })) {
        return res.json({ error: 'This email already exists' })
    } else {
        next()
    }
}