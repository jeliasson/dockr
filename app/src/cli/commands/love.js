const consola = require('consola')
const colors = require('colors')

const program = require('commander')

program.on('command:love', function(args) {
	consola.log(
		`\nHave a great day! ️` +
			`❤️ `.repeat(Math.floor(Math.random() * 5) + 1) +
			`\n`
	)

	process.exit(0)
})
