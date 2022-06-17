/* MONGODB */
const Player = require('../database/schemas/PlayerSchema');

module.exports = async (req, res, next) => {
    // Procuro um player com o ID passado
    const player = await Player.findById(req.id)
    if (!player) {  // Se não houver nenhum player
        return res.json({  // Retorno um erro
            error: true,
            msg: 'Nenhum player foi encontrado!'
        })
    }
    next()
}