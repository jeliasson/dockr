const consola = require('consola')

const program = require('commander')

program.command('config', 'cd to dockr config directory')

program.on('command:config', function(dir) {
	consola.warn('This command is work in progress.')

	process.exit(0)
})
