function calcMentalEnergy(constituition, mindResistence=false, force=false) {
    return Math.floor((30 + constituition + (mindResistence?5:0) + (force?5:0)) * 2.5)
}

module.exports = calcMentalEnergy