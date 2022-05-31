/* MONGODB */
const Player = require('../database/schemas/PlayerSchema');

module.exports = async (req, res, next) => {
    // Procuro um player com o ID passado
    const player = await Player.findById(req.id)
    if (!player) {  // Se não houver nenhum player
        return res.status(400).json({  // Retorno um erro
            error: 'Nenhum player foi encontrado!'
        })
    }

    next()
}