const consola = require('consola')
const colors = require('colors')

const program = require('commander')

const shell = require('shelljs')

const path = require('../../utils/path')
const nonl = require('../../utils/helpers/nonl')
const yaml = require('../../logic/yaml')

program.command('restart', 'restart all docker containers')

program.on('command:restart', function(dir) {
	if (!shell.which('docker-compose')) {
		consola.error('Sorry, this command requires docker-compose')

		process.exit(1)
	}

	const runningContainers = shell.exec(`docker ps --format "{{.Names}}"`, {
		silent: true,
	})
	let runningContainersSplit = runningContainers.split('\n')

	runningContainersSplit.forEach(function(container) {
		if (container) {
			console.log(`Restarting ${container}...`)
			if (
				shell.exec(`docker restart ${container} 2>&1 > /dev/null`, {
					async: true,
				}).code !== 0
			) {
				//consola.info(`${container} does not seem to be running...?`)
			}
		}
	})

	process.exit(0)
})
