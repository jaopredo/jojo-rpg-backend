function calcLife(constituition, painResistence=false, imunity=false, force=false){
    return 10 + constituition + (painResistence?5:0) + (imunity?5:0) + (force?5:0)
}

module.exports = calcLife