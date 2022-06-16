const router = require('express').Router()

/* DATABASE */
const SubStand = require('../database/schemas/SubStandSchema')

/* MIDDLEWARES */
const masterAuth = require('../middlewares/masterAuth')
const charValidation = require('../middlewares/charValidation')

/* ROTAS GET */
router.get('/', masterAuth, charValidation, async (req, res) => {
    const substand = await SubStand.findOne({ playerId: req.id });
    return res.json(substand)
})

module.exports = app => app.use('/substand', router)