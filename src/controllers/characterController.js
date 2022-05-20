const { xpTable, maxLevel } = require('../configs/limiters.json')
const router = require('express').Router()

/* MONGO DB */
const Player = require('../database/schemas/PlayerSchema')
const Character = require('../database/schemas/CharacterSchema')
const Inventory = require('../database/schemas/InventorySchema')

/* MIDDLEWARE */
const masterAuth = require('../middlewares/masterAuth')

/* MÉTODOS PARA RETORNO DOS ATRIBUTOS */
// Método para retornar os atributos
router.get('/attributes', masterAuth, async (req, res) => {
    // Procuro um player com o ID passado
    const player = await Player.findById(req.id)
    if (!player) {  // Se não houver nenhum player
        return res.status(400).json({  // Retorno um erro
            error: 'Nenhum player foi encontrado!'
        })
    }

    // Se tudo der certo, procuro o personagem com o playerId
    const character = await Character.findOne({ playerId: player.id })

    return res.json(character.attributes)
})

// Método para retornar especialidades
router.get('/specialitys', masterAuth, async (req, res) => {
    const attr = req.query.attr  // Pego o attr

    // Procuro um player com o ID passado
    const player = await Player.findById(req.id)
    if (!player) {  // Se não houver nenhum player
        return res.status(400).json({  // Retorno um erro
            error: 'Nenhum player foi encontrado!'
        })
    }

    const character = await Character.findOne({ playerId: player.id })

    if (!!attr) return res.json(character.specialitys[attr])
    return res.json(character.specialitys)
})

// Método para retornar atributos de combate
router.get('/combat', masterAuth, async (req, res) => {
    const player = await Player.findById(req.id)
    if (!player) {
        return res.status(400).json({
            error: 'Nenhum player encontrado!'
        })
    }
    const character = await Character.findOne({ playerId: player.id })

    return res.json(character.combat)
})

// Método para retornar atributos de level
router.get('/level', masterAuth, async (req, res) => {
    const player = await Player.findById(req.id)
    if (!player) {
        return res.status(400).json({
            error: 'Nenhum player encontrado!'
        })
    }
    const character = await Character.findOne({ playerId: player.id })

    return res.json(character.level)
})


/**
 * A partir daqui são algumas requisições que serão mais utilizadas pelo administrador do sistema,
 * no caso, o mestre
 */

/* MÉTODOS PARA ATUALIZAR PERSONAGENS */
router.patch('/levelup', masterAuth, async (req, res) => {
    const {
        newSpec,
        newAttr,
    } = req.body  // Extraio os atributos

    // Vendo se existe no database
    const player = await Player.findById(req.id)
    if (!player) {
        return res.status(400).json({
            error: 'Esse player não foi encontrado, tente novamente!'
        })
    }
    // Se o player existe no database, pego o meu Personagem
    const character = await Character.findOne({ playerId: player.id })

    /* ALTERANDO O NÍVEL DO PERSONAGEM */
    const { level } = character

    // Checo se já está no nível máximo
    if (level.actualLevel >= maxLevel) return res.json({ error: 'Já está no nível máximo!' })
    level.actualLevel += 1  // Aumento um nível
    level.maxXP = xpTable[level.actualLevel-1]  // Coloco o XP máximo
    level.actualXP = 0  // Reseto o XP atual

    /* ESPECIALIDADES E ATRIBUTOS */
    /**
     * Checo se tenho newSpec ou newAttr, se tiver newSpec:
     * eu adiciono um objeto novo nas especialidades de acordo com o label e a especialidade
     * passados dentro do objeto 'newSpec'.
     */
    if (!!newSpec) {
        const { specialitys, attributes } = character
        const { label, spec } = newSpec
        specialitys[label][spec] = true

        await Character.updateOne({ playerId: player.id }, {
                specialitys: specialitys,
                attributes: attributes,
                level: level
        })
    }
    if (!!newAttr) {
        const { specialitys, attributes } = character
        const attr = Object.keys(newAttr)[0]
        attributes[attr] = newAttr[attr]

        await Character.updateOne({ playerId: player.id }, {
            attributes: attributes,
            specialitys: specialitys,
            level: level
        })
    }

    // Procuro o novo personagem porque ele foi atualizado na database
    let newChar = await Character.findOne({ playerId: player.id })

    // Retorno ele
    return res.json(newChar)
})

// Adicionar algum item no inventário
router.patch('/inventory/add', masterAuth, async (req, res) => {
    const player = await Player.findById(req.id)
    if (!player) res.json({ error: 'Player não encontrado' })

    await Inventory.updateOne({ playerId: req.id }, { $push: { items: req.body.item } })

    return res.send('oi')
})


module.exports = app => app.use('/character', router)