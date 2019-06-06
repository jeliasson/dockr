const consola = require('consola')
const colors = require('colors')

const program = require('commander')

const shell = require('shelljs')

const path = require('../../utils/path')
const nonl = require('../../utils/helpers/nonl')
const yamlConfigs = require('../../logic/compose/yamlConfigs')
const package = require('../../../package.json')

program.command('info', 'info about the dockr installation')

program.on('command:info', function (dir) {

    consola.warn(`This command is work in progress.`)

    consola.info(`Gathering information about dockr and it's dependencies...`)
    consola.log()

    const nodeVersion = nonl(shell.exec(`node -v`, { silent: true }))
    const npmModules = nonl(shell.exec(`ls -lA ${path.app.root}/node_modules | wc -l`, { silent: true }))
    const npmVersion = nonl(shell.exec(`npm -v`, { silent: true }))

    consola.info(`Dockr`)
    consola.log(`- Version: ${package.version}`)
    consola.log(`- Repository: ${package.repository.url}`)
    consola.log()

    consola.info(`Node`)
    consola.log(`- Version: ${nodeVersion}`)
    consola.log()

    consola.info(`NPM`)
    consola.log(`- Version: ${npmVersion}`)
    consola.log(`- Project dependencies: ${npmModules}`)
    consola.log()

    consola.info(`Detected compose files`)
    yamlConfigs.forEach(function (yaml) {
        consola.log(`- ${yaml.app} (${yaml.file}.yaml)`)
    })

    process.exit(1)
})