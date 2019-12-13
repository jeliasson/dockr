const consola = require('consola')
const colors = require('colors')

const program = require('commander')

program.command('verify', 'verify syntax of all yaml files')

program.on('command:verify', function(dir) {
	consola.warn('This command is not yet implemented')
	consola.info('This command should ' + 'verify'.green + ' all yaml files')

	process.exit(0)
})
