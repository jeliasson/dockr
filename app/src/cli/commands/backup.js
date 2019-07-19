const consola = require('consola')
const colors = require('colors')

const fs = require('fs-extra')
const program = require('commander')
const shell = require('shelljs')

const path = require('../../utils/path')

program.command('backup', 'make a backup of dockr')

program.on('command:backup', function (dir) {

    consola.warn('This command is not yet implemented')

    consola.log()
    
    // Instance date
    const date = new Date()

    // Root backup path
    const backupRootPath = `${path.backup}`

    // Backup path backup/YYYYMMDD_HHMMSS
    const backupPath = `${backupRootPath}/${date.toISOString().split('T')[0].replace(/-/g, '') + '_' + date.getHours() + date.getMinutes() + date.getSeconds()}`

    consola.info(`Creating backup directory...\n` + `  ${backupPath}\n`.gray)

    // Create log directory
    // @todo: Move this logic to the dockr bootstrapper
    if (!fs.existsSync(`${path.root}/logs`)) {
        fs.mkdirSync(`${path.root}/logs`)
    }

    // Create backup root path
    if (!fs.existsSync(backupRootPath)) {
        fs.mkdirSync(backupRootPath)
    }

    // Create backup path
    if (!fs.existsSync(backupPath)) {
        fs.mkdirSync(backupPath)
    }
  
    // @todo: Optionally bring down defined containers that don't seem to like backup on the fly, without using root.
    try {

        const backupLogFile = `${path.logs}/backup.log`
        const backupCommand = `cp -rv "${path.config}" "${backupPath}" >> ${backupLogFile}`

        consola.info(`Creating backup...\n` + `$ `.blue + `${backupCommand}`.gray + `\n`)

        if (shell.exec(`${backupCommand}`).code !== 0) {
            consola.warn(`Something went wrong during copy of backup. See details above.`)
        }

        consola.success(`Backup completed!`)

    } catch (err) {

        consola.error(`An exception was caught during backup :(`)
        console.error(err)

        process.exit(1)
    }
     
    process.exit(0)
})