const {
    createDirectory,
    initPackageJson,
    installDependencies,
    initTs,
    initBabel,
} = require('./steps')

async function start() {
    const projectPath = await createDirectory()
    await initPackageJson(projectPath)
    await installDependencies(projectPath)
    await initTs(projectPath)
    await initBabel(projectPath)
}

start()