const consola = require('consola')
const colors = require('colors')

const fs = require('fs')
const program = require('commander')
const shell = require('shelljs')

const path = require('../../utils/path')
const yaml = require('../../logic/yaml')

program.command('run', 'verify, merge and compose up')

program.on('command:run', async function(args) {
	consola.info('Finding yaml files in config directory...')

	// Try parsing the files
	let outputFileMerged = ''
	try {
		outputFileMerged = yaml.parse(yaml.files())
	} catch (err) {
		consola.error(`An error occured while processing merging yaml files`)
		consola.info(err)

		process.exit(1)
	}

	const cmd = `docker-compose -f ${outputFileMerged} up -d --remove-orphans`

	console.log()
	consola.info('Running docker-compose...')
	console.log(`$ `.blue + `${cmd}`.gray) // @todo: Add to debugging switch
	console.log()

	// Try docker-compose the merge
	try {
		shell.exec(cmd, { silent: false })
	} catch (err) {
		consola.error(`An error occured while processing merging yaml files`)
		consola.info(err)

		process.exit(1)
	}

	process.exit(0)
})
