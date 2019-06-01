const colors = require('colors')
const program = require('commander')

program.command('create [app]', 'create a new app with boilerplates')

program.on('command:compose', function (dir) {
    console.log('This command should create a new app')

    process.exit(1)
})