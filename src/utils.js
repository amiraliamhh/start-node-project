const chalk = require('chalk')

exports.logError = err => {
    console.log(chalk.red(`${err}\n`))
}

exports.logSuccess = msg => {
    console.log(chalk.green(`${msg}\n`))
}

exports.logInfo = msg => {
    console.log(chalk.blue(`${msg}\n`))
}
