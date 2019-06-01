const colors = require('colors')
const program = require('commander')

program.command('compose [cmd]', 'docker-compose wrapper')

program.on('command:compose', function (dir) {
    console.log('This command should wrap to \'docker-compose -f <generated-yaml> [cmd]\'')

    process.exit(1)
})