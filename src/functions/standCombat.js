module.exports = {
    calcMove: (speed) => speed==0?0:5*speed + 5,
    calcAPR: (speed) => speed=0?0:Math.floor(speed/2 + 1/2),
    calcBonus: (precision) => precision==0?-2:precision-1,
    calcShield: (durability) => 2*durability - 2,
    calcStandJump: (strengh) => strengh<2?0:5*strengh-5,
    calcRange: (range) => {
        switch (range) {
            case 0:
                return 0
            case 1:
                return 1
            case 2:
                return 2
            case 3:
                return 10
            case 4:
                return 20
            case 5:
                return 100
        }
    },
    calcDamage: (strengh) => {
        switch (strengh) {
            case 0:
                return 0
            case 1:
                return 6
            case 2:
                return 8
            case 3:
                return 10
            case 4:
                return 12
            case 5:
                return 20
        }
    }
}