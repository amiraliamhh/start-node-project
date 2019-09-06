const { exec } = require('child_process')
const { logInfo } = require('../utils')

module.exports = function initPackageJson(path) {
    logInfo('Initializing package.json ...')
    return new Promise((resolve, reject) => {
        exec('npm init --yes', {
            cwd: path,
        }, (err, stdout, stderr) => {
            if (err) return reject(err)

            resolve()
        })
    })
}
