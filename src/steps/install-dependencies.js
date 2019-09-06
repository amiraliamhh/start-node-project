const { exec } = require('child_process')
const { logInfo } = require('../utils')

const devDependencies = [
    'typescript',
    '@babel/cli',
    '@babel/core',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-runtime',
    '@babel/polyfill',
    '@babel/preset-env',
    '@babel/runtime',
]

module.exports = function installDependencies(path) {
    logInfo('Installing neccssary packages ...')
    return new Promise((resolve, reject) => {
        exec(`npm install -D ${devDependencies.join(' ')}`, {
            cwd: path,
        }, (err, stdout, stderr) => {
            if (err) return reject(err)

            resolve()
        })
    })
}
