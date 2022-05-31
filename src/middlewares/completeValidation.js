const { maxAttrLevel } = require('../configs/limiters.json')

module.exports = (req, res, next) => {
    /*
     * Uma validação completa a partir do objeto do personagem, conferindo se todos os valores
     * estão dentro dos limites.
    */
    const { race } = req.body.character.basic
    const { attributes } = req.body.character

    /* VALIDAÇÃO DOS ATRIBUTOS */
    // Para cada raça dentro das chaves de maxAttrLevel
    for (let lrace of Object.keys(maxAttrLevel)) {
        if (lrace === race) {  // Se a raça for igual a do player
            for (attr of Object.values(attributes)) if (attr > maxAttrLevel[lrace]) return res.json({error: "As informações do personagem são inválidas!"})
        }
    }
    next()
}