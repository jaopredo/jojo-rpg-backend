const router = require('express').Router()

/* SCHEMAS */
const Stand = require('../database/schemas/StandSchema')

/* MIDDLEWARES */
const masterAuth = require('../middlewares/masterAuth')
const charValidation = require('../middlewares/charValidation')

/* ROTAS GET */
// Retorna tudo
router.get('/', masterAuth, charValidation, async (req, res) => {
    const stand = await Stand.findOne({ playerId: req.id })
    return res.json(stand);
})

module.exports = app => app.use('/stand', router)