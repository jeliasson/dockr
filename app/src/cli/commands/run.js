const consola = require('consola')
const colors = require('colors')

const program = require('commander')

const path = require('../../utils/path')
const yamlConfigs = require('../../logic/compose/yamlConfigs')

program.command('run', 'verify, merge and compose up')

program.on('command:run', function (dir) {

    consola.warn('This command is work in progress.')
    
    consola.info('Finding yaml files in config directory...')
    consola.log()

    yamlConfigs.forEach(function(yaml) {
        consola.log('Processing ' + yaml.app + ' and it\'s file ' + yaml.file + '.yaml')
    })

    process.exit(1)
})