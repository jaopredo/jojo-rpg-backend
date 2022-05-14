const configs = require('../../configs/limiters.json')
const mongoose = require('../connection')
const {
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

// Função de LOG
const log = require('../../functions/log')


/* Schema do Personagem */
const CharacterSchema = new mongoose.Schema({
    playerId: mongoose.Schema.Types.ObjectId,
    basic: charBasicConfig,
    attributes: charAttrConfig,
    specialitys: charSpecsConfig,
    combat: charCombatConfig,
    level: {
        "actualLevel": { type: Number, default: 1 },
        "maxXP": { type: Number, default: configs.xpTable[0] },
        "actualXP": { type: Number, default: 0 }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
CharacterSchema.pre('save', function(next) {
    // Separando atributos e especialidades
    const { attributes, specialitys } = this
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

    this.combat = {  // Coloco o novo objeto dentro do Schema a ser salvo
        life: life,
        mentalEnergy: mentalEnergy,
        movement: movement,
        da: successDifficult,
        shield: 0
    }
    next()
})
CharacterSchema.pre('updateOne', async function(next) {
    // const thisChar = await this.model.findOne(this.getQuery());
    const updateObj = this.getUpdate()

    // Separando atributos e especialidades
    const { attributes, specialitys } = updateObj
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

    this.set({  // Coloco o novo objeto dentro do Schema a ser salvo
        combat: {
            life: life,
            mentalEnergy: mentalEnergy,
            movement: movement,
            da: successDifficult,
            shield: 0
        }
    })

    next()
})


// Fazendo logs
CharacterSchema.post('save', function(doc) {
    const logMessage = `Um novo PERSONAGEM criado
    Criado: ${doc.createdAt}
    Nome: ${doc.basic.name}
    Id: ${doc.id}
    Player Associado: ${doc.playerId}
    `

    log(logMessage, 'char')
})


const Character = mongoose.model('Character', CharacterSchema)

module.exports = Character