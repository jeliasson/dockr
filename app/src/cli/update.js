const colors = require('colors')
const program = require('commander')

program.command('update', 'update dockr')

program.on('command:update', function (dir) {
    console.log('This command should update dockr using e.g. git pull')

    process.exit(1)
})