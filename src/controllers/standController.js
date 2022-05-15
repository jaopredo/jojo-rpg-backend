const router = require('express').Router()

/* SCHEMAS */
const Player = require('../database/schemas/PlayerSchema')
const Stand = require('../database/schemas/StandSchema')

/* MIDDLEWARES */
const masterAuth = require('../middlewares/masterAuth')

/* ROTAS GET */
// Retorna os atributos básicos
router.get('/basic', masterAuth, async (req, res) => {
    const email = req.query.email
    if (!email) return res.status(400).json({ error: 'Nenhum email fornecido' })
    
    const player = await Player.findOne({ email })
    if (!player) return res.status(400).json({ error: 'Nenhum player com esse email está cadastrado' })

    const stand = await Stand.findOne({ playerId: player.id })
    
    return res.json(stand.basic)
})

// Retorna os atributos
router.get('/attributes', masterAuth, async (req, res) => {
    const email = req.query.email
    if (!email) return res.status(400).json({ error: 'Nenhum email fornecido' })
    
    const player = await Player.findOne({ email })
    if (!player) return res.status(400).json({ error: 'Nenhum player com esse email está cadastrado' })

    const stand = await Stand.findOne({ playerId: player.id })
    
    return res.json(stand.attributes)
})

// Retorna as habilidades
router.get('/abilitys', masterAuth, async (req, res) => {
    const email = req.query.email  // Pego o email da query
    // Se não houver nenhum email
    if (!email) return res.status(400).json({ error: 'Nenhum email fornecido' })
    
    // Busco o player na database
    const player = await Player.findOne({ email })
    // Se nenhum for encontrado
    if (!player) return res.status(400).json({ error: 'Nenhum player com esse email está cadastrado' })

    // Procuro o stand pelo ID do player encontrado
    const stand = await Stand.findOne({ playerId: player.id })
    
    // Retorno o objeto
    return res.json(stand.abilitys)
})

// Retorna as informações de combate
router.get('/combat', masterAuth, async (req, res) => {
    const email = req.query.email
    if (!email) return res.status(400).json({ error: 'Nenhum email fornecido' })
    
    const player = await Player.findOne({ email })
    if (!player) return res.status(400).json({ error: 'Nenhum player com esse email está cadastrado' })

    const stand = await Stand.findOne({ playerId: player.id })
    
    return res.json(stand.combat)
})

// Retorna as informações de movimento
router.get('/move', masterAuth, async (req, res) => {
    const email = req.query.email
    if (!email) return res.status(400).json({ error: 'Nenhum email fornecido' })
    
    const player = await Player.findOne({ email })
    if (!player) return res.status(400).json({ error: 'Nenhum player com esse email está cadastrado' })

    const stand = await Stand.findOne({ playerId: player.id })
    
    return res.json(stand.move)
})

module.exports = app => app.use('/stand', router)