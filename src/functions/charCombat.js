function calcLife(constituition, painResistence=false, imunity=false, force=false){
    return Math.floor(((10 + constituition) * 2 + ((painResistence?5:0) + (imunity?5:0) + (force?5:0)))/1.5)
}

function calcMentalEnergy(constituition, mindResistence=false, force=false) {
    return Math.floor((30 + constituition + (mindResistence?5:0) + (force?5:0)) * 2.5)
}

function calcMovement(strengh, dexterity, athletics=false, jump=false) {
    return strengh + dexterity + (athletics?5:0) + (jump?5:0)
}

function calcSuccessDifficult(dexterity, vigillance, reflex=false) {
    return Math.floor((dexterity + vigillance)/2 + (reflex?5:0))
}

module.exports = {
    calcLife,
    calcMentalEnergy,
    calcMovement,
    calcSuccessDifficult
}