const consola = require('consola')

const program = require('commander')

const shell = require('shelljs')

const path = require('../../utils/path')
const nonl = require('../../utils/helpers/nonl')

//program.command('debug', 'debug info')

program.on('command:debug', function(dir) {
	consola.warn(`This command is work in progress.`)

	const whoami = nonl(shell.exec(`whoami`, { silent: true }))
	const config = shell.exec(`ls -lA ${path.config} | grep -v "total 0"`, {
		silent: true,
	})

	consola.info(`Paths`)
	console.log(`- root: ${path.root}`)
	console.log(`- backup: ${path.backup}`)
	console.log(`- config: ${path.config}`)
	console.log(`- logs: ${path.logs}`)
	console.log(`- app.root: ${path.script.entrypoint}`)
	console.log(`- app.bin: ${path.app.bin}`)
	console.log(`- app.src: ${path.app.src}`)
	console.log()

	consola.info(`System`)
	console.log(`- whoami: ${whoami}`)
	console.log()

	consola.info(`Config directory`)
	console.log(`${config}`)
	console.log()

	process.exit(0)
})
