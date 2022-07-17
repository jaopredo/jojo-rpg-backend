const {
    calcLife,
    calcMentalEnergy,
    calcSuccessDifficult,
    calcMovement
} = require('./charCombat')

function makeCombatObject(attributes, specialitys) {
    const {
        strengh: strenghSpecs,  // Especialidades de Força
        dexterity: dexSpecs, // Especialidades de Destreza
        constituition: constSpecs,  // Especialidades de Constituição
        vigillance: vigSpecs, // Especialidades de Vigilância
    } = specialitys

    // Calculando Vida
    const life = calcLife(
        attributes.constituition,  // Passo minha constituição
        constSpecs?.painResistence,
        constSpecs?.imunity,
        constSpecs?.force,
    )
    // Nota: A exclamação serve para indicar que, se constSpecs não for UNDEFINED, eu passo o atributo 'painResistence'

    // Calculando Energia Mental
    const mentalEnergy = calcMentalEnergy(
        attributes.constituition,
        strenghSpecs?.mindResistence,
        constSpecs?.force
    )

    // Calculando Dificuldade do Acerto
    const successDifficult = calcSuccessDifficult(
        attributes.dexterity,
        attributes.vigillance,
        vigSpecs?.reflex
    )

    // Calculando Movimento
    const movement = calcMovement(
        attributes.strengh,
        attributes.dexterity,
        strenghSpecs?.athletics,
        strenghSpecs?.jump
    )

    return {
        life: life,
        mentalEnergy: mentalEnergy,
        movement: movement,
        da: successDifficult,
        shield: 0
    }
};

module.exports = makeCombatObject;