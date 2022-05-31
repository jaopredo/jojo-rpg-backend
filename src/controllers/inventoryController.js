const router = require('express').Router()

/* MONGO DB */
const Inventory = require('../database/schemas/InventorySchema')

/* MIDDLEWARES */
const masterAuth = require('../middlewares/masterAuth')
const charValidation = require('../middlewares/charValidation')

// Adicionar algum item no inventário
router.patch('/add', masterAuth, charValidation,  async (req, res) => {
    await Inventory.updateOne({ playerId: req.id }, { $push: { items: req.body } })
    return res.send({ msg: 'Success' })
})

module.exports = app => app.use('/inventory', router)