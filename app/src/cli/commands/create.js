const consola = require('consola')
const colors = require('colors')

const program = require('commander')

program.command('create [app]', 'create a new app with boilerplates')

program.on('command:create', function (dir) {
    
    consola.warn('This command is not yet implemented')
    consola.info('Command should create a new boiler plate app')

    process.exit(1)
})