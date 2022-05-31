const { racesAdvantages, maxAttrLevel } = require('../configs/limiters.json')

module.exports = (character) => {
    const { attributes, specialitys, basic } = character
    let raceAdv

    // Checo qual a raça e armazeno as vantagens dentro de uma variável
    Object.keys(racesAdvantages).forEach(adRace => {
        if (adRace == basic.race) raceAdv = racesAdvantages[adRace]
    })

    // Altero os atributos
    raceAdv.attribute.forEach(attrs => {
        // Armazeno                      Se a soma passar do limite
        attributes[attrs[0]] = attributes[attrs[0]]+attrs[1]>maxAttrLevel[basic.race]?10:attributes[attrs[0]]+attrs[1]
        //   Atributo[força]       Atributo[força] +    2   >           10
    })

    // Altero as especialidades
    raceAdv.specs.forEach(specInfo => {
        if (!specialitys[specInfo[1]]) {
            specialitys[specInfo[1]] = {}
        }
        specialitys[specInfo[1]][specInfo[0]] = true
    })

    character = {
        basic: basic,
        attributes: attributes,
        specialitys: specialitys,
    }

    return character
}