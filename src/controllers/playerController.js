const router = require('express').Router()

/* MONGODB */
const Player = require('../database/schemas/PlayerSchema')

/* GENERATE TOKEN */
const generateToken = require('../functions/generateToken')

/* FUNÇÃO DE VALIDAÇÃO */
const completeValidation = require('../functions/completeValidation')


/* ROTA DE REGISTRO */
router.post('/register', async (req, res) => {
    const { email, character: personagem } = req.body

    /* VALIDAÇÃO PARA VER SE O PERSONAGEM ESTÁ COM OS ATRIBUTOS DENTRO DO LIMITE */
    const valid = completeValidation(personagem)
    if (!valid) {
        return res.status(400).json({ error: "Some attributes were wrong! Try to send another object!" })
    }

    /* VALIDAÇÃO PARA VER SE JÁ NÃO EXISTE NO BANCO DE DADOS */
    if (await Player.findOne({ email })) {
        return res.status(400).json({ error: 'This email already exists' })
    }

    const player = await Player.create(req.body)
    player.password = undefined

    return res.json({
        character: player,
        token: generateToken({
            id: player.id,
            email: player.email,
            access: player.accessKey
        })
    })
})

/* ROTA DE LOGIN */
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    // Procuro o player dentro do meu banco de dados
    const player = await Player.findOne({ email }).select('+password')
    
    // Se o player não tiver sido encontrado
    if (!player) {
        return res.status(400).send({ error: 'This email isn\'t in our databases!' })
    }
    if (player.password !== password) {
        return res.status(400).send({ error: 'The passwords doesn\'t match' })
    }

    return res.json({
        character: player,
        token: generateToken({
            id: player.id,
            email: player.email,
            access: player.accessKey
        })
    })
})

/* TESTAR SE TEM O EMAIL NO BANCO DE DADOS */
router.post('/check', async (req, res) => {
    const { email } = req.body
    let exists = false

    /* VALIDAÇÃO PARA VER SE JÁ NÃO EXISTE NO BANCO DE DADOS */
    if (await Player.findOne({ email })) {
        exists = true
    } else {
        exists = false
    }

    return res.json({
        exists: exists
    })
})

module.exports = app => app.use('/player', router)