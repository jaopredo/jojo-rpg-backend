const router = require('express').Router()
const cors = require('cors')

const corsConfig = {
    origin: [ "https://jojo-rpg-frontend.herokuapp.com" ],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    allowedHeaders: ['Content-Type', 'authorization']
}

router.use(cors(corsConfig))

/* SCHEMAS */
const Stand = require('../database/schemas/StandSchema')

/* MIDDLEWARES */
const masterAuth = require('../middlewares/masterAuth')
const charValidation = require('../middlewares/charValidation')

/* ROTAS GET */
// Retorna tudo
router.get('/', masterAuth, charValidation, async (req, res) => {
    const stand = await Stand.findOne({ playerId: req.id })
    return res.json(stand);
})

app.options("*", cors(corsConfig))

module.exports = app => app.use('/stand', router)