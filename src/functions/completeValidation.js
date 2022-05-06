const configs = require('../configs/limiters.json')

function completeValidation(character) {
    /*
     * Uma validação completa a partir do objeto do personagem, conferindo se todos os valores
     * estão dentro dos limites.
    */
    const { race } = character.basic

    /* VALIDAÇÃO DOS ATRIBUTOS */
    for (attribute of character.attributes) {
        console.log(attribute)
    }
}

module.exports = completeValidation