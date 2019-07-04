const consola = require('consola')
const colors = require('colors')

const program = require('commander')

program.command('edit [app]', 'edit app composer.yaml')

program.on('command:edit', function (dir) {

    consola.warn('This command is not yet implemented')
    consola.info('Command should start user defaults editor with the app composer.yaml file')

    process.exit(1)
})