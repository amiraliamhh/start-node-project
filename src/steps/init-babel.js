const { writeFile } = require('fs')
const { resolve: resolvePath } = require('path')
const { logInfo } = require('../utils')

// this should become dynamic
const presets = [
    '@babel/env',
    '@babel/typescript',
]

const plugins = [
    '@babel/transform-runtime',
    '@babel/proposal-object-rest-spread',
    '@babel/proposal-class-properties',
]

module.exports = function initBabel(path) {
    logInfo('Setting up Babel ...')
    const data = {
        presets,
        plugins,
    }
    return new Promise((resolve, reject) => {
        writeFile(resolvePath(path, '.babelrc'), JSON.stringify(data, 4), err => {
            if (err) return reject(err)

            resolve()
        })
    })
}
