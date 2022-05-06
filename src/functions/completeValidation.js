const configs = require('../configs/limiters.json')

function completeValidation(character) {
    /*
     * Uma validação completa a partir do objeto do personagem, conferindo se todos os valores
     * estão dentro dos limites.
    */
    const { race } = character.basic
    const { maxAttrLevel: aMax } = configs

    /* VALIDAÇÃO DOS ATRIBUTOS */
    for (attribute of Object.values(character.attributes)) {
        if ( (race == "human" || race == "rockman") && attribute > aMax.rockhuman ) {
            return false
        }
        if ( race == "alien" && attribute > aMax.alien ) {
            return false
        }
        if ( race == "vampire" && attribute > aMax.vampire ) {
            return false
        }
    }
    return true
}

module.exports = completeValidation