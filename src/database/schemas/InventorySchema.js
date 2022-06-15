const mongoose = require('../connection');

/* SCHEMA DO ITEM */
const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
    weapon: { type: Boolean, default: false },
    details: { type: String, default: "" },
    damage: String,
    critic: String,
    tipo: String,
    range: String,
    effects: {
        burning: Boolean,
        bullet: Boolean,
        slashing: Boolean,
        explosion: Boolean,
        concussion: Boolean,
        heal: Boolean,
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