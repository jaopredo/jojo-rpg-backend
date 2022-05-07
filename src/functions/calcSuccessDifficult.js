function calcSuccessDifficult(dexterity, dodge=false, reflex=false) {
    return 5 + dexterity + (dodge?5:0) + (reflex?5:0)
}

module.exports = calcSuccessDifficult