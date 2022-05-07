function calcMovement(strengh, dexterity, athletics=false, jump=false) {
    return strengh + dexterity + (athletics?5:0) + (jump?5:0)
}

module.exports = calcMovement