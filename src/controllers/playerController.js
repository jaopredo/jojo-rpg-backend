const router = require('express').Router()
const { v4 } = require('uuid')

/* MONGODB */
const Player = require('../database/schemas/PlayerSchema')
const Character = require('../database/schemas/CharacterSchema')
const Stand = require('../database/schemas/StandSchema')
const SubStand = require('../database/schemas/SubStandSchema')
const Inventory = require('../database/schemas/InventorySchema')

/* FUNCTIONS */
const generateToken = require('../functions/generateToken')
const advantages = require('../functions/advantages')

/* MIDDLEWARE */
const masterAuth = require('../middlewares/masterAuth')
const completeValidation = require('../middlewares/completeValidation')


/* ROTA DE REGISTRO */
router.post('/register', completeValidation, async (req, res) => {
    const {
        email,
        password,
        character: personagem,
        stand: persona,
        subStand: secondaryStand
    } = req.body
    let subStand

    /* VALIDAÇÃO PARA VER SE JÁ NÃO EXISTE NO BANCO DE DADOS */

    // Criando documento e salvando no meu Banco de Dados
    const player = await Player.create({
        id: v4(),
        email: email,
        password: password,
    })
    player.password = undefined

    // Criando o documento do meu personagem
    const character = await Character.create({
        id: v4(),
        playerId: player.id,
        ...advantages(personagem)
    })

    // Criando documento do meu stand
    const stand = await Stand.create({
        id: v4(),
        playerId: player.id,
        ...persona
    })

    // Tentando criar o SUB-STAND
    if (secondaryStand) {
        subStand = await SubStand.create({
            id: v4(),
            playerId: player.id,
            ...secondaryStand
        })
    }

    // Criando meu Inventário
    await Inventory.create({ playerId: player.id })

    return res.json({
        player: player,
        character: character,
        stand: stand,
        subStand: subStand,
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

    // Se tiver o player normalmente, pego o Personagem
    const character = await Character.findOne({ playerId: player.id })
    
    // Removo algumas coisas para melhorar a compreensão
    player.password = undefined
    character.playerId = undefined

    return res.json({
        player: player,
        character: character,
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

    console.log(generateToken({
        accessKey: 'master'
    }))

    return res.json({
        exists: exists
    })
})


module.exports = app => app.use('/player', router)