const consola = require('consola')

const program = require('commander')

const shell = require('shelljs')

const path = require('../../utils/path')
const nonl = require('../../utils/helpers/nonl')
const yaml = require('../../logic/yaml')
const package = require('../../../package.json')

program.command('info', 'info about the dockr installation')

program.on('command:info', function(dir) {
	consola.warn(`This command is work in progress.`)

	consola.info(`Gathering information about dockr and it's dependencies...`)
	console.log()

	const dockerVersion = nonl(
		shell.exec(
			`docker version | grep 'Version:' | head -1 | awk '{ print $2 }'`,
			{ silent: true }
		)
	)
	const dockerComposeVersion = nonl(
		shell.exec(
			`docker-compose version | grep 'docker-compose' | awk '{ print $3}' | cut -d ',' -f1`,
			{ silent: true }
		)
	)

	const nodeVersion = nonl(shell.exec(`node -v`, { silent: true }))
	const npmModules = nonl(
		shell.exec(`ls -lA ${path.app.root}/node_modules | wc -l`, {
			silent: true,
		})
	)
	const npmVersion = nonl(shell.exec(`npm -v`, { silent: true }))

	consola.info(`Dockr`)
	console.log(`- Version: ${package.version}`)
	console.log(`- Repository: ${package.repository.url}`)
	console.log(`- Path: ${path.root}`)
	console.log(`- Output: ${path.docker.compose}`)
	console.log()

	consola.info(`Docker`)
	console.log(`- Version: ${dockerVersion}`)
	console.log()

	consola.info(`Docker Compose`)
	console.log(`- Version: ${dockerComposeVersion}`)
	console.log()

	consola.info(`Node`)
	console.log(`- Version: ${nodeVersion}`)
	console.log()

	consola.info(`NPM`)
	console.log(`- Version: ${npmVersion}`)
	console.log(`- Project dependencies: ${npmModules}`)
	console.log()

	consola.info(`Detected compose files`)
	yaml.files().forEach(function(yaml) {
		console.log(`- ${yaml.app} (${yaml.file}.yaml)`)
	})

	process.exit(0)
})
