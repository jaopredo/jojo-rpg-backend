const mongoose = require('../connection');

/* SCHEMA DO ITEM */
const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
    weapon: { type: Boolean, default: false },
    effects: {
        damage: String,
        burning: Boolean,
        bullet: Boolean,
        slashing: Boolean,
        explosion: Boolean,
        concussion: Boolean,
    }
});

/* SCHEMA DO INVENTÁRIO */
const InventorySchema = new mongoose.Schema({
    playerId: mongoose.Types.ObjectId,
    npcId: mongoose.Types.ObjectId,
    items: [ItemSchema]
});


// Criando os dois documentos
const Inventory = mongoose.model('Inventory', InventorySchema);

module.exports = Inventory