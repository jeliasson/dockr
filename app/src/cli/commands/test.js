const consola = require('consola')
const colors = require('colors')

const program = require('commander')

program.command('test', 'just a test command')

program.on('command:test', function () {
    console.log(colors.rainbow('This is a test command'))
    
    process.exit(1)
})