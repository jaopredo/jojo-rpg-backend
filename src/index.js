require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require('./controllers/playerController')(app)
require('./controllers/characterController')(app)
require('./controllers/standController')(app)
require('./controllers/subStandController')(app)
require('./controllers/dmController')(app)
require('./controllers/npcController')(app)
require('./controllers/inventoryController')(app)

app.listen(process.env.PORT || 3000)
