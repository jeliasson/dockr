const consola = require('consola')
const colors = require('colors')

const fs = require('fs')
const program = require('commander')

const path = require('../../utils/path')

program.command('backup', 'make a backup of dockr')

program.on('command:backup', function (dir) {
    
    consola.warn('This command is not yet implemented')
    consola.info('Command should take backup of dockr')

    consola.log()
    consola.info('Creating backup directory')

    const backupPath = `${path.backup}`
    if (!fs.existsSync(backupPath)) {
        fs.mkdirSync(backupPath)
    }
    

    process.exit(0)
})