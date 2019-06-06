const consola = require('consola')
const colors = require('colors')

const program = require('commander')

program.command('backup', 'make a backup of dockr')

program.on('command:backup', function (dir) {
    console.log('This command should make a new backup')

    process.exit(1)
})