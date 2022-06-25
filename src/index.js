require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

const corsConfig = {
    origin: [
        "https://jojo-rpg-frontend.herokuapp.com",
        "http://jojo-rpg-dm.herokuapp.com",
        // "http://localhost:3000"
    ],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    allowedHeaders: ['Content-Type', 'authorization']
};

app.use(cors(corsConfig));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require('./controllers/playerController')(app)
require('./controllers/characterController')(app)
require('./controllers/standController')(app)
require('./controllers/subStandController')(app)
require('./controllers/dmController')(app)
require('./controllers/npcController')(app)
require('./controllers/inventoryController')(app)

app.options("*", cors(corsConfig));

app.listen(process.env.PORT || 3030)
