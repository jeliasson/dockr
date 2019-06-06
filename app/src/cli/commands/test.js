const consola = require('consola')
const colors = require('colors')

const program = require('commander')

program.command('test', 'just a test command')

program.on('command:test', function () {

    consola.warn('This command is not yet implemented')
    consola.info('Command should test all yaml files')
    
    process.exit(1)
})