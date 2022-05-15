function calcLife(constituition, painResistence=false, imunity=false, force=false){
    return 10 + constituition + (painResistence?5:0) + (imunity?5:0) + (force?5:0)
}

function calcMentalEnergy(constituition, mindResistence=false, force=false) {
    return Math.floor((30 + constituition + (mindResistence?5:0) + (force?5:0)) * 2.5)
}

function calcMovement(strengh, dexterity, athletics=false, jump=false) {
    return strengh + dexterity + (athletics?5:0) + (jump?5:0)
}

function calcSuccessDifficult(dexterity, dodge=false, reflex=false) {
    return 5 + dexterity + (dodge?5:0) + (reflex?5:0)
}

module.exports = {
    calcLife,
    calcMentalEnergy,
    calcMovement,
    calcSuccessDifficult
}