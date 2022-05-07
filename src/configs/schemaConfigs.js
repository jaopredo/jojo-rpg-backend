/* CONFIGURAÇÕES PLAYER  */
const playerConfig = {
    "email": {
        type: String,
        required: true,
    },
    "password": {
        type: String,
        required: true,
        select: false,
    },
    "accessKey": {
        type: String,
        required: true,
        default: "player",
    },
}

/* CONFIGURAÇÕES DO PERSONAGEM */
// Configuração do básico
const charBasicConfig = {
    "name": {
        type: String,
        required: true,
    },
    "age": {
        type: Number,
        required: true,
    },
    "race": {
        type: String,
        required: true,
    },
    "patent": {
        type: String,
        required: true,
    },
    "ocupation": {
        type: String,
        required: true,
    },
}

// Configuração dos atributos
const charAttrConfig = {
    "strengh": Number,
    "dexterity": Number,
    "constituition": Number,
    "education": Number,
    "commonSense": Number,
    "vigillance": Number,
    "charisma": Number,
    "size": Number,
}

const charSpecsConfig = {
    "strengh": {
        "athletics": Boolean,
        "mindResistence": Boolean,
        "jump": Boolean,
        "fight": Boolean,
        "climb": Boolean
    },
    "dexterity": {
        "acrobacy": Boolean,
        "stealth": Boolean,
        "aim": Boolean,
        "dodge": Boolean
    },
    "constituition": {
        "force": Boolean,
        "imunity": Boolean,
        "painResistence": Boolean
    },
    "education": {
        "history": Boolean,
        "geography": Boolean,
        "math": Boolean,
        "investigation": Boolean,
        "forensic": Boolean,
        "tecnology": Boolean,
        "sociology": Boolean,
        "art": Boolean,
        "physics": Boolean,
        "chemistry": Boolean,
        "foreignLanguage": Boolean,
        "programming": Boolean,
        "policy": Boolean,
        "religion": Boolean,
        "mechanic": Boolean,
        "biology": Boolean
    },
    "commonSense": {
        "computer": Boolean,
        "medicine": Boolean,
        "bribery": Boolean,
        "survival": Boolean,
        "break": Boolean,
        "cooking": Boolean,
        "firstAid": Boolean,
        "drive": Boolean
    },
    "vigillance": {
        "reflex": Boolean,
        "perception": Boolean,
        "insight": Boolean,
    },
    "charisma": {
        "intimidation": Boolean,
        "cheating": Boolean,
        "acting": Boolean,
        "charm": Boolean,
        "sexy": Boolean,
        "persuasion": Boolean
    },
}

const charCombatConfig = {
    life: Number,
    mentalEnergy: Number,
    movement: Number,
    da: Number,
    shield: Number
}


/* EXPORTANDO */
module.exports = {
    playerConfig,
    charBasicConfig,
    charAttrConfig,
    charSpecsConfig,
    charCombatConfig
}