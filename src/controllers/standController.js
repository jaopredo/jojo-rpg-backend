const router = require('express').Router()

/* SCHEMAS */
const Player = require('../database/schemas/PlayerSchema')
const Stand = require('../database/schemas/StandSchema')

/* MIDDLEWARES */
const masterAuth = require('../middlewares/masterAuth')
const charValidation = require('../middlewares/charValidation')

/* ROTAS GET */
// Retorna os atributos básicos
router.get('/basic', masterAuth, charValidation, async (req, res) => {
    const stand = await Stand.findOne({ playerId: req.id })
    return res.json(stand.basic)
})

// Retorna os atributos
router.get('/attributes', masterAuth, charValidation, async (req, res) => {
    const stand = await Stand.findOne({ playerId: req.id })
    return res.json(stand.attributes)
})

// Retorna as habilidades
router.get('/abilitys', masterAuth, async (req, res) => {
    // Procuro o stand pelo ID do player encontrado
    const stand = await Stand.findOne({ playerId: req.id })
    // Retorno o objeto
    return res.json(stand.abilitys)
})

// Retorna as informações de combate
router.get('/combat', masterAuth, charValidation, async (req, res) => {
    const stand = await Stand.findOne({ playerId: req.id })
    return res.json(stand.combat)
})

// Retorna as informações de movimento
router.get('/move', masterAuth, charValidation, async (req, res) => {
    const stand = await Stand.findOne({ playerId: req.id })
    return res.json(stand.move)
})

module.exports = app => app.use('/stand', router)