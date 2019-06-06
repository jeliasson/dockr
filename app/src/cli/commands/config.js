const consola = require('consola')
const colors = require('colors')

const program = require('commander')

const shell = require('shelljs')

const path = require('../../utils/path')

program.command('config', 'cd to dockr config directory')

program.on('command:config', function (dir) {

    consola.warn('This command is work in progress.')

    process.exit(1)
})