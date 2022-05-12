const router = require('express').Router()

const Character = require('../database/schemas/CharacterSchema')
/* MONGO DB */
const Player = require('../database/schemas/PlayerSchema')


/* MÉTODOS PARA RETORNO DOS ATRIBUTOS */
// Método para retornar os atributos
router.get('/attributes', async (req, res) => {
    const email = req.query.email  // Pego o email passado na URL

    const player = await Player.findOne({ email })
    if (!player) {
        return res.status(400).json({
            error: 'Nenhum player foi encontrado!'
        })
    }
    const character = await Character.findOne({ playerId: player.id })

    return res.json(character.attributes)
})

// Método para retornar especialidades
router.get('/specialitys', async (req, res) => {
    const email = req.query.email  // Pego o email
    const attr = req.query.attr  // Pego o attr

    const player = await Player.findOne({ email })
    if (!player) {
        return res.status(400).json({
            error: 'Nenhum player encontrado!'
        })
    }
    const character = await Character.findOne({ playerId: player.id })

    if (!!attr) return res.json(character.specialitys[attr])
    return res.json(character.specialitys)
})

// Método para retornar atributos de combate
router.get('/combat', async (req, res) => {
    const email = req.query.email  // Pego o email

    const player = await Player.findOne({ email })
    if (!player) {
        return res.status(400).json({
            error: 'Nenhum player encontrado!'
        })
    }
    const character = await Character.findOne({ playerId: player.id })

    return res.json(character.combat)
})

// Método para retornar atributos de level
router.get('/level', async (req, res) => {
    const email = req.query.email  // Pego o email

    const player = await Player.findOne({ email })
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
/*  CONTINUAR POSTERIORMENTE
router.patch('/levelup', async (req, res) => {
    const {
        email,
        newSpec,
        newAttr,
    } = req.body

    // Vendo se existe no database
    const player = await Player.findOne({ email })
    if (!player) {
        return res.status(400).json({
            error: 'Esse player não foi encontrado, tente novamente!'
        })
    }

    /**
     *  { education: { biology: true } }
        ###############
        {
        strengh: {},
        dexterity: {},
        constituition: { force: true },
        education: { tecnology: true, foreignLanguage: true, programming: true },
        commonSense: { cooking: true, drive: true },
        vigillance: {},
        charisma: { sexy: true, persuasion: true }
        }
    *

    // Specialitys and Attributes
    const {
        attributes,
        specialitys
    } = player.character
    let corresponding, newPlayer

    if (newSpec) {  // Se houver uma nova especialidade
        console.log("Antes")
        console.log(specialitys)
        
        for (spec of Object.keys(specialitys)) {  // Analiso de qual atributo é
            if (spec == Object.keys(newSpec)[0]) corresponding = spec
        }

        const newAttrObj = {
            ...specialitys[corresponding],
            ...newSpec[corresponding]
        }

        const newSubObj = { ...specialitys }
        newSubObj[corresponding] = newAttrObj

        newPlayer = { ...player.character }
    }

    // await Player.updateOne({ email }, { character: 'trolado' })
    console.log(newPlayer)

    return res.json({
        actualSpecs: specialitys,
        newSpecs: newSpec
    })
})
*/

module.exports = app => app.use('/character', router)