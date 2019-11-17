const consola = require('consola')

const program = require('commander')

program.command('clean', 'clean temporary generated files')

program.on('command:clean', function (dir) {

    consola.warn('This command is not yet implemented')
    consola.info('Command should clean temporary generated files')

    process.exit(0)
})