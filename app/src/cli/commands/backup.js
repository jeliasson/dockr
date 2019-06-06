const consola = require('consola')
const colors = require('colors')

const program = require('commander')

program.command('backup', 'make a backup of dockr')

program.on('command:backup', function (dir) {
    
    consola.warn('This command is not yet implemented')
    consola.info('Command should take backup of dockr')

    process.exit(1)
})