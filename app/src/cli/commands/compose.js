const consola = require('consola')
const colors = require('colors')

const program = require('commander')

program.command('compose [cmd]', 'docker-compose wrapper')

program.on('command:compose', function (dir) {

    consola.warn('This command is not yet implemented')
    consola.info('Command should wrap to \'docker-compose -f <generated-yaml> [cmd]\'')

    process.exit(1)
})