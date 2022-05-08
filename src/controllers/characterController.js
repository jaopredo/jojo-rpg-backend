const router = require('express').Router()

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
    const { character } = player 

    return res.json(character.attributes)
})

// Método para retornar especialidades
router.get('/specialitys', async (req, res) => {
    const email = req.query.email  // Pego o email

    const player = await Player.findOne({ email })
    if (!player) {
        return res.status(400).json({
            error: 'Nenhum player encontrado!'
        })
    }
    const { character } = player

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
    const { character } = player

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
    const { character } = player

    return res.json(character.level)
})


/**
 * A partir daqui são algumas requisições que serão mais utilizadas pelo administrador do sistema,
 * no caso, o mestre
 */

/* MÉTODOS PARA ATUALIZAR PERSONAGENS */
router.patch('/levelup', (req, res) => {
    
})

module.exports = app => app.use('/character', router)