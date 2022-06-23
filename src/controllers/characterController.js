const { xpTable, maxLevel } = require('../configs/limiters.json')
const router = require('express').Router()

/* MONGO DB */
const Character = require('../database/schemas/CharacterSchema')

/* MIDDLEWARE */
const masterAuth = require('../middlewares/masterAuth')
const charValidation = require('../middlewares/charValidation')

/* MÉTODOS PARA RETORNO DOS ATRIBUTOS */
// Retorna tudo
router.get('/', masterAuth, charValidation, async (req, res) => {
    const character = await Character.findOne({ playerId: req.id })

    return res.json(character);
})

/**
 * A partir daqui são algumas requisições que serão mais utilizadas pelo administrador do sistema,
 * no caso, o mestre
 */

/* MÉTODOS PARA ATUALIZAR PERSONAGENS */
router.patch('/saveXP', masterAuth, charValidation, async (req, res) => {
    const { newXP } = req.body;  // Pego o xp passado
    
    const character = await Character.findOne({ playerId: req.id })
    const { level } = character

    if (newXP === -1) return res.json({ msg: 'not updated' })
    await Character.updateOne({ playerId: req.id }, {
        level: {
            actualXP: newXP,
            maxXP: level.maxXP,
            actualLevel: level.actualLevel
        }
    })

    return res.json({ msg: 'success' })
})

router.patch('/levelup', masterAuth, charValidation, async (req, res) => {
    /*
        newSpec: {
            label: 'strengh',
            spec: 'athletics',
        },
        newAttr: { constituition: 8 }
    */
    const {
        newSpec,
        newAttr,
    } = req.body  // Extraio os atributos

    // Se o player existe no database, pego o meu Personagem
    const character = await Character.findOne({ playerId: req.id })

    /* ALTERANDO O NÍVEL DO PERSONAGEM */
    const { level } = character
    // Checo se já está no nível máximo
    if (level.actualLevel >= maxLevel) return res.json({ error: 'Já está no nível máximo!' })
    level.actualLevel += 1;
    level.maxXP = xpTable[level.actualLevel];
    level.actualXP = 0;

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

        await Character.updateOne({ playerId: req.id }, {
            specialitys: specialitys,
            attributes: attributes,
            level: level,
        })
    }
    if (!!newAttr) {
        const { specialitys, attributes } = character  // Pego os atributos e especialidades do meu obj
        const attr = Object.keys(newAttr)[0]  // Pego o primeiro valor de newAttr, no caso o atributo
        attributes[attr] = newAttr[attr]  // Coloco o novo valor

        await Character.updateOne({ playerId: req.id }, {
            attributes: attributes,
            specialitys: specialitys,
            level: level,
        })
    }
    // Retorno ele
    return res.json({ msg: 'success' })
})


module.exports = app => app.use('/character', router)