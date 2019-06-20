const consola = require('consola')
const colors = require('colors')

const program = require('commander')
const shell = require('shelljs')

const path = require('../../utils/path')

program.command('compose [cmd]', 'docker-compose wrapper')

program.on('command:compose', function (args) {

    // Check for required arguments
    if (!args[0]) {
        consola.error(`Requires one argument, e.g 'up' or 'down'`)
        process.exit(1)
    }

    // Construct docker-compose command
    const cmd = `docker-compose -f ${path.docker.compose} ${args[0]}` // @todo Run all arguments, to allow e.g. 'up -d'.
    consola.info(`Running ${cmd}`)

    // Run docker-compose
    shell.exec(cmd)

    process.exit(1)
})