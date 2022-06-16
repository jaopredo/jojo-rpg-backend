const router = require('express').Router()

/* MONGO DB */
const Inventory = require('../database/schemas/InventorySchema')

/* MIDDLEWARES */
const masterAuth = require('../middlewares/masterAuth')
const charValidation = require('../middlewares/charValidation')

// Retorna inventário
router.get('/', masterAuth, charValidation, async (req, res) => {
    const inventory = await Inventory.findOne({ playerId: req.id });
    return res.json(inventory);
})

// Adicionar algum item no inventário
router.put('/item', masterAuth, charValidation,  async (req, res) => {
    await Inventory.updateOne({ playerId: req.id }, { $push: { items: req.body } });
    const inventory = await Inventory.findOne({ playerId: req.id });
    return res.send(inventory);
})

// Remove item
router.delete('/item', masterAuth, charValidation, async (req, res) => {
    const { itemId } = req.query;

    await Inventory.updateOne({ playerId: req.id }, { $pull: { items: { _id: itemId } } })
    const inventory = await Inventory.findOne({ playerId: req.id });

    return res.json(inventory);
})

// Atualiza um item
router.patch('/item', masterAuth, charValidation, async (req, res) => {
    const { itemId, quantity } = req.body;

    await Inventory.updateOne(
        { playerId: req.id, items: { $elemMatch: { _id: itemId } } },
        {
            $set: {
                "items.$.quantity": quantity
            }
        }
    )
    const inventory = await Inventory.findOne({ playerId: req.id });
    return res.json(inventory)
}) 


module.exports = app => app.use('/inventory', router)