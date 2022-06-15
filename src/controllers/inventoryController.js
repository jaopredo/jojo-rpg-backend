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
    await Inventory.updateOne({ playerId: req.id }, { $push: { items: req.body } })
    return res.send({ msg: 'Success' })
})

// Remove item
router.delete('/item', masterAuth, charValidation, async (req, res) => {
    const { itemId } = req.query;
    
    await Inventory.updateOne({ playerId: req.id }, { $pull: { items: { _id: itemId } } })

    return res.json({ msg: 'Success' });
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
    return res.json({ msg: 'Success' })
}) 


module.exports = app => app.use('/inventory', router)