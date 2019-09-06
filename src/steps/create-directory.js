const inquirer = require('inquirer')
const { stat, readdir, promises } = require('fs')
const { resolve: resolvePath } = require('path')
const { logError } = require('../utils')

module.exports = async function createDirectory() {
    let projectName = await getProjectName()

    if (!projectName) {
        const hasContent = await dirHasContent(process.cwd())
        if (hasContent) {
            logError('Directory is not empty.')
            return false
        }

        return process.cwd()
    }

    while (true) {
        try {
            await checkAvailability(projectName)
            await promises.mkdir(resolvePath(process.cwd(), projectName))
            break
        } catch (err1) {
            if (err1.type === 'chechkAvailability') {
                logError('A directory with this name already exists, please choose another name.\n')
                projectName = await getProjectName()
            } else {
                console.error(err1)
            }
        }
    }

    return resolvePath(process.cwd(), projectName)
}

async function getProjectName() {
    const { projectName } = await inquirer.prompt([
        {
            type: 'input',
            name: 'projectName',
            message: 'Enter a name for your project:',
        },
    ])

    return projectName
}

function checkAvailability(name) {
    return new Promise((resolve, reject) => {
        stat(resolvePath(process.cwd(), name), (err, result) => {
            if (err) {
                // meaning no directory was found
                if (err.errno === -2) {
                    return resolve()
                }

                reject(Object.assign({}, err, { type: 'chechkAvailability' }))
            }

            if (result && result.isDirectory()) {
                return reject({ type: 'chechkAvailability' })
            }

            resolve()
        })
    })
}

function dirHasContent(path) {
    return new Promise((resolve ,reject) => {
        readdir(path, (err, files) => {
            if (err) return reject(err)

            resolve(!!files.length)
        })
    })
}
