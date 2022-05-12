const { maxAttrLevel } = require('../configs/limiters.json')

function completeValidation(character) {
    /*
     * Uma validação completa a partir do objeto do personagem, conferindo se todos os valores
     * estão dentro dos limites.
    */
    const { race } = character.basic
    const { attributes } = character

    /* VALIDAÇÃO DOS ATRIBUTOS */
    for (let lrace of Object.keys(maxAttrLevel)) {
        console.log(lrace)
        if (lrace === race) {
            for (attr of Object.values(attributes)) if (attr > maxAttrLevel[lrace]) return false
        }
    }
    return true
}

module.exports = completeValidation