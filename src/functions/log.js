const fs = require('fs')
const path = require('path')

function log(text, file) {
    /**
     * Escrever os LOGS
     * @param {String} text Texto que vai ser escrito
     * @param {String} file É um personagem ou um player ou um stand
     */
    const filePath = path.join(__dirname, '..', 'logs', `${file}Logs.txt`)

    fs.readFile(filePath, (err, textString) => {
        if (err) {
            console.log(err)
            return
        }
        fs.writeFile(filePath, textString + '\n\n' + text, err => {
            if (err) {
                console.log(err)
                return
            }
        })
    })
}

module.exports = log