const consola = require('consola')
const colors = require('colors')

const fs = require('fs')
const program = require('commander')
const shell = require('shelljs')

const path = require('../../utils/path')
const yaml = require('../../logic/yaml')

program.command('logs [app]', 'dockr logs, or dockr app logs')

program.on('command:logs', function(args) {
	// Check for arguments (i.e the app)
	if (!args[0]) {
		consola.warn(`This command is work in progress.`)
		consola.info(`Logs for dockr is yet not done.`)

		consola.log()
		consola.info(`To show logs of apps, i.e. docker-compose logs, run: `)
		consola.log(`$ `.blue + `docker logs `.gray + `[app]`.yellow + `\n`)

		const cmd = `docker-compose -f ${path.docker.compose} logs --follow`

		consola.info(
			`Instead of not showing anything, in 10 seconds you'll see logs of all apps...`
		)

		consola.log(`$ `.blue + `${cmd} `.gray)

		shell.exec(`sleep 10`, { silent: false })

		shell.exec(cmd, { silent: false })
	} else {
		const app = args[0]
		const follow = args[1] ? '--follow' : '' // @todo: Actual arguments

		const cmd = `docker-compose -f ${path.docker.compose} ${follow} logs --follow ${app}`
		consola.info(`Running ${cmd}`)
		shell.exec(cmd, { silent: false })
	}

	process.exit(0)
})
