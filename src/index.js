require('dotenv').config()
const express = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require('./controllers/playerController')(app)

app.listen(process.env.PORT, () => {
    console.log(`Rodando na porta ${process.env.PORT}`)
})
