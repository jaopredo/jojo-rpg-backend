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

/* DELETAR UM PLAYER */
router.delete('/remove', masterAuth, async (req, res) => {
    const access = req.access
    if (access !== 'master') {
        return res.status(404).json({ error: 'Acesso negado! Deve ser um mestre' })
    }
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
        message: 'Player deletado com sucesso!'
    })
})

/* PEGA TODOS OS PERSONAGENS */
router.get('/characters', masterAuth, async (req, res) => {
    const { access } = req
    if (access !== 'master') return res.json({ error: 'Rota não autorizada' })
    
    const allPlayers = await Player.find({})
    const allNPC = await Npc.find({})

    return res.send({
        players: allPlayers,
        npcs: allNPC
    })
})

/* PEGA TODOS OS STANDS */
router.get('/stands', masterAuth, async (req, res) => {
    const { access } = req
    if (access !== 'master') return res.json({ error: 'Rota não autorizada' })
    
    const allStands = await Stand.find({})

    return res.send(allStands)
})

module.exports = app => app.use('/dm', router)