const mongoose = require('../connection')

// Funções para calcular atributos
const {
    calcLife,
    calcMentalEnergy,
    calcSuccessDifficult,
    calcMovement
} = require('../../functions/charCombat')

// Função de LOG
const log = require('../../functions/log')


/* Schema do Personagem */
const NpcSchema = new mongoose.Schema({
    basic: {
        name: { type: String, required: true },
        age: { type: Number, required: true, min: 20 },
        race: { type: String, required: true },
        occupation: { type: String, required: true },
    },
    attributes: {
        strengh: Number,
        dexterity: Number,
        constituition: Number,
        education: Number,
        commonSense: Number,
        vigillance: Number,
        charisma: Number,
        size: Number,
    },
    specialitys: {
        strengh: {
            athletics: Boolean,
            mindResistence: Boolean,
            jump: Boolean,
            fight: Boolean,
            climb: Boolean
        },
        dexterity: {
            acrobacy: Boolean,
            stealth: Boolean,
            aim: Boolean,
            dodge: Boolean
        },
        constituition: {
            force: Boolean,
            imunity: Boolean,
            painResistence: Boolean
        },
        education: {
            history: Boolean,
            geography: Boolean,
            math: Boolean,
            investigation: Boolean,
            forensic: Boolean,
            tecnology: Boolean,
            sociology: Boolean,
            art: Boolean,
            physics: Boolean,
            chemistry: Boolean,
            foreignLanguage: Boolean,
            programming: Boolean,
            policy: Boolean,
            religion: Boolean,
            mechanic: Boolean,
            biology: Boolean
        },
        commonSense: {
            computer: Boolean,
            medicine: Boolean,
            bribery: Boolean,
            survival: Boolean,
            break: Boolean,
            cooking: Boolean,
            firstAid: Boolean,
            drive: Boolean
        },
        vigillance: {
            reflex: Boolean,
            perception: Boolean,
            insight: Boolean,
        },
        charisma: {
            intimidation: Boolean,
            cheating: Boolean,
            acting: Boolean,
            charm: Boolean,
            sexy: Boolean,
            persuasion: Boolean,
        },
    },
    combat: {
        life: Number,
        mentalEnergy: Number,
        movement: Number,
        da: Number,
        shield: Number
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
})
NpcSchema.pre('save', function(next) {
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
NpcSchema.pre('updateOne', async function(next) {
    // const thisChar = await this.model.findOne(this.getQuery());
    const updateObj = this.getUpdate()  // Pego as informações novas

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
        },
        updatedAt: new Date()
    })

    next()
})


// Fazendo logs


const Npc = mongoose.model('Npc', NpcSchema)

module.exports = Npc