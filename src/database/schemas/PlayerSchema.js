const configs = require('../../configs/limiters.json')
const mongoose = require('../connection')
const {
    playerConfig,
    charBasicConfig,
    charAttrConfig,
    charSpecsConfig,
    charCombatConfig
} = require('../../configs/schemaConfigs')
// Funções para calcular atributos
const calcLife = require('../../functions/calcLife')
const calcMentalEnergy = require('../../functions/calcMentalEnergy')
const calcSuccessDifficult = require('../../functions/calcSuccessDifficult')
const calcMovement = require('../../functions/calcMovement')

/* Objeto do Personagem */
const Character = {
    "basic": charBasicConfig,
    "attributes": charAttrConfig,
    "specialitys": charSpecsConfig,
    "combat": charCombatConfig
}

/* Objeto do Stand */
const Stand = {

}

const PlayerSchema = new mongoose.Schema({
    ...playerConfig,
    "character": Character,
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

PlayerSchema.pre('save', function(next) {
    // Separando atributos e especialidades
    const { attributes, specialitys } = this.character
    const {
        strengh: strenghSpecs,  // Especialidades de Força
        dexterity: dexSpecs, // Especialidades de Destreza
        constituition: constSpecs,  // Especialidades de Constituição
        vigillance: vigSpecs, // Especialidades de Vigilância
    } = specialitys

    // Calculando Vida
    const life = calcLife(
        attributes.constituition,
        constSpecs?.painResistence,
        constSpecs?.imunity,
        constSpecs?.force,
    )

    // Calculando Energia Mental
    const mentalEnergy = calcMentalEnergy(
        attributes.constituition,
        strenghSpecs?.mindResistence,
        constSpecs?.force
    )

    // Calculando Dificuldade do Acerto
    const successDifficult = calcSuccessDifficult(
        attributes.dexterity,
        dexSpecs?.dodge,
        vigSpecs?.reflex
    )

    // Calculando Movimento
    const movement = calcMovement(
        attributes.strengh,
        attributes.dexterity,
        strenghSpecs?.athletics,
        strenghSpecs?.jump
    )

    this.character.combat = {
        life: life,
        mentalEnergy: mentalEnergy,
        movement: movement,
        da: successDifficult,
        shield: 0
    }
    next()
})

const Player = mongoose.model('Player', PlayerSchema)

module.exports = Player