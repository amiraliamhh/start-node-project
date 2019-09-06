const { exec } = require('child_process')
const { logInfo } = require('../utils')

module.exports = function initTs(path) {
    logInfo('Generating tsconfig.json file ...')
    return new Promise((resolve, reject) => {
        exec(`tsc --init --target es2015`, {
            cwd: path,
        }, err => {
            if (err) return reject(err)

            resolve()
        })
    })
}
