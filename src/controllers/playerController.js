const router = require('express').Router()
const { v4 } = require('uuid')

/* MONGODB */
const Player = require('../database/schemas/PlayerSchema')
const Character = require('../database/schemas/CharacterSchema')
const Stand = require('../database/schemas/StandSchema')
const SubStand = require('../database/schemas/SubStandSchema')

/* GENERATE TOKEN */
const generateToken = require('../functions/generateToken')

/* FUNÇÃO DE VALIDAÇÃO */
const completeValidation = require('../functions/completeValidation')

/* MIDDLEWARE */
const masterAuth = require('../middlewares/masterAuth')


/* ROTA DE REGISTRO */
router.post('/register', async (req, res) => {
    const {
        email,
        password,
        character: personagem,
        stand: persona,
        subStand: secondaryStand
    } = req.body
    let subStand

    /* VALIDAÇÃO PARA VER SE O PERSONAGEM ESTÁ COM OS ATRIBUTOS DENTRO DO LIMITE */
    const valid = completeValidation(personagem)
    if (!valid) {
        return res.status(400).json({ error: "Some attributes were wrong! Try to send another object!" })
    }

    /* VALIDAÇÃO PARA VER SE JÁ NÃO EXISTE NO BANCO DE DADOS */
    if (await Player.findOne({ email })) {
        return res.status(400).json({ error: 'This email already exists' })
    }

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
        ...personagem
    })

    // Criando documento do meu stand
    const stand = await Stand.create({
        id: v4(),
        playerId: player.id,
        charId: character.id,
        ...persona
    })

    // Tentando criar o SUB-STAND
    if (secondaryStand) {
        subStand = await SubStand.create({
            id: v4(),
            playerId: player.id,
            charId: character.id,
            standId: stand.id,
            ...secondaryStand
        })
    }

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

    return res.json({
        exists: exists
    })
})

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

    // Deleto o player e o personagem passado
    await Character.deleteOne({ playerId: player.id })
    await Stand.deleteOne({ playerId: player.id })
    await SubStand.deleteOne({ playerId: player.id })
    await Player.deleteOne({ email })

    return res.status(200).json({
        message: 'Player deletado com sucesso!'
    })
})

module.exports = app => app.use('/player', router)