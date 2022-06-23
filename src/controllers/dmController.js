const router = require('express').Router()

/* MONGODB */
const Player = require('../database/schemas/PlayerSchema')
const Character = require('../database/schemas/CharacterSchema')
const Stand = require('../database/schemas/StandSchema')
const SubStand = require('../database/schemas/SubStandSchema')
const Inventory = require('../database/schemas/InventorySchema')
const Npc = require('../database/schemas/NpcSchema')

/* MIDDLEWARE */
const masterAuth = require('../middlewares/masterAuth')
const dmAuth = require('../middlewares/dmAuth.js')

/* DELETAR UM PLAYER */
router.delete('/remove', masterAuth, dmAuth, async (req, res) => {
    const email = req.query.email

    // Checando se o email foi passado
    if (!email) return res.status(404).json({ error: 'Email não foi informado na QUERY' })

    // Checo se tem o player informado
    const player = await Player.findOne({ email })
    // Se não tiver mando erro
    if (!player) return res.status(404).json({ error: 'Player não encontrado!' })

    // Deleto tudo relacionado ao player
    await Character.deleteOne({ playerId: player.id })
    await Stand.deleteOne({ playerId: player.id })
    await SubStand.deleteOne({ playerId: player.id })
    await Inventory.deleteOne({ playerId: player.id })
    await Player.deleteOne({ email })

    return res.status(200).json({
        msg: 'Player deletado com sucesso!'
    })
})

/* PEGA TODOS OS PERSONAGENS */
router.get('/characters', masterAuth, dmAuth, async (req, res) => {
    const allPlayers = await Player.find({})
    const allNPC = await Npc.find({})

    return res.send({
        players: allPlayers,
        npcs: allNPC
    })
})

router.get('/getplayerchar', masterAuth, dmAuth, async (req, res) => {
    const { id } = req.query
    const character = await Character.findOne({ playerId: id })
    const stand = await Stand.findOne({ playerId: id })
    const substand = await SubStand.findOne({ playerId: id })
    const inventory = await Inventory.findOne({ playerId: id })

    return res.json({
        character: character,
        stand: stand,
        substand: substand,
        inventory: inventory,
    })
})

/* PEGA TODOS OS STANDS */
router.get('/stand', masterAuth, dmAuth, async (req, res) => {
    const { id } = req.query;
    
    const stand = await Stand.findOne({ npcId: id });

    return res.send(stand)
})

router.get('/substand', masterAuth, dmAuth, async (req, res) => {
    const { id } = req.query;
    
    const substand = await SubStand.findOne({ npcId: id });
    if (!substand) return res.json({})

    return res.send(substand)
})

module.exports = app => app.use('/dm', router)