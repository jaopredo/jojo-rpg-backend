require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require('./controllers/playerController')(app)
require('./controllers/characterController')(app)
require('./controllers/standController')(app)
require('./controllers/subStandController')(app)
require('./controllers/dmController')(app)
require('./controllers/npcController')(app)
require('./controllers/inventoryController')(app)

app.listen(process.env.PORT || 3030)
