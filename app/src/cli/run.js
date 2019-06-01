const colors = require('colors')
const program = require('commander')

program.command('run', 'verify, merge and run docker-compose')

program.on('command:run', function (dir) {
    console.log('This should validate and generate yaml, and then start them.')

    process.exit(1)
})