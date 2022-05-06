require('dotenv').config()
const jwt = require('jsonwebtoken')

const generateToken = (params = {}) => jwt.sign(params, process.env.APP_HASH, {
    expiresIn: 3.156e+7
})

module.exports = generateToken