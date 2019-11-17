const consola = require('consola')
const colors = require('colors')

const program = require('commander')

const shell = require('shelljs')

program.command('info', 'info about the dockr installation')

program.on('command:info', function(dir) {
    consola.warn(`This command is work in progress.`)

    consola.info(
        `This command should restart all docker contaianers, with exception to RESTART_EXCEPTION`
    )
    console.log()

    process.exit(0)
})
