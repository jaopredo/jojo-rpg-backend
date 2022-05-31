const router = require('express').Router()

/* MONGODB */
const Stand = require('../database/schemas/StandSchema')
const SubStand = require('../database/schemas/SubStandSchema')
const Inventory = require('../database/schemas/InventorySchema')
const Npc = require('../database/schemas/NpcSchema')

/* MIDDLEWARES */
const masterAuth = require('../middlewares/masterAuth')

/* ADICIONAR UM NPC */
router.post('/add', masterAuth, async (req, res) => {
    const { access } = req  // Pego o acesso que ele possui
    if (access !== 'master') {  // Se o acesso não for MASTER
        // Retorno erro
        return res.status(404).json({ error: 'Acesso negado! Deve ser um mestre' })
    }
    // Se tudo for certo, crio meu npc
    const npc = await Npc.create(req.body.npc)
    
    // Crio uma variável stand
    let stand
    if (req.body.stand) {  // Se eu tiver criado um personagem com stand
        stand = await Stand.create({  // Crio o stand
            npcId: npc.id,
            ...req.body.stand
        })
    }

    await Inventory.create({ npcId: npc.id })  // Crio o inventário dele

    return res.send({
        npc: npc,
        stand: stand,
    })
})

module.exports = app => app.use('/npc', router)