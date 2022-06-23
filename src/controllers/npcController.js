const router = require('express').Router()

/* MONGODB */
const Stand = require('../database/schemas/StandSchema')
const SubStand = require('../database/schemas/SubStandSchema')
const Npc = require('../database/schemas/NpcSchema')

/* MIDDLEWARES */
const masterAuth = require('../middlewares/masterAuth')
const dmAuth = require('../middlewares/dmAuth')

/* ADICIONAR UM NPC */
router.post('/', masterAuth, dmAuth, async (req, res) => {
    if (!req.body.npc) return res.json({
        error: true,
        msg: 'Nenhum npc fornecido!'
    })
    // Se tudo for certo, crio meu npc
    const npc = await Npc.create(req.body.npc)
    
    if (req.body.stand) {  // Se eu tiver criado um personagem com stand
        await Stand.create({  // Crio o stand
            npcId: npc.id,
            ...req.body.stand
        })
    }
    if (req.body.substand) {
        await SubStand.create({
            npcId: npc.id,
            ...req.body.substand
        })
    }

    return res.send({
        error: false,
        msg: 'Criado com sucesso!'
    })
})

router.delete('/', masterAuth, dmAuth, async (req, res) => {
    const { id } = req.query;

    const npc = await Npc.findById(id);
    if (!npc) return res.json({
        error: true,
        msg: 'Não há nenhum npc com esse ID'
    })
    
    
    await Stand.findOneAndDelete({ npcId: npc.id })
    await SubStand.findOneAndDelete({ npcId: npc.id })
    await Npc.findByIdAndDelete(id);

    return res.json({
        error: false,
        msg: 'Deletado com sucesso!'
    })
})

module.exports = app => app.use('/npc', router)