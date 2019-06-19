const consola = require('consola')
const colors = require('colors')

const program = require('commander')

const shell = require('shelljs')

const path = require('../../utils/path')
const nonl = require('../../utils/helpers/nonl')
const yaml = require('../../logic/yaml')
const package = require('../../../package.json')

program.command('info', 'info about the dockr installation')

program.on('command:info', function (dir) {

    consola.warn(`This command is work in progress.`)

    consola.info(`Gathering information about dockr and it's dependencies...`)
    console.log()

    const nodeVersion = nonl(shell.exec(`node -v`, { silent: true }))
    const npmModules = nonl(shell.exec(`ls -lA ${path.app.root}/node_modules | wc -l`, { silent: true }))
    const npmVersion = nonl(shell.exec(`npm -v`, { silent: true }))

    consola.info(`Dockr`)
    console.log(`- Version: ${package.version}`)
    console.log(`- Repository: ${package.repository.url}`)
    console.log()

    consola.info(`Node`)
    console.log(`- Version: ${nodeVersion}`)
    console.log()

    consola.info(`NPM`)
    console.log(`- Version: ${npmVersion}`)
    console.log(`- Project dependencies: ${npmModules}`)
    console.log()

    consola.info(`Detected compose files`)
    yaml.files().forEach(function (yaml) {
        console.log(`- ${yaml.app} (${yaml.file}.yaml)`)
    })

    process.exit(1)
})