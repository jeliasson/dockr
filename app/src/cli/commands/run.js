const consola = require('consola')

const colors = require('colors')
const program = require('commander')

const shell = require('shelljs')

const path = require('../../utils/path')

program.command('run', 'verify, merge and run docker-compose')

program.on('command:run', function (dir) {

    console.log('Finding yaml files in config directory...')

    const yamlPattern = /.*\/dockr\/config\/([a-zA-Z0-9]{1,})\/[a-zA-Z0-9]{1,}\.yaml$/
    const yamlFiles = shell.find(path.config).filter(function (file) { 
        return file.match(yamlPattern)
    })

    yamlFiles.forEach(function(yaml) {
        consola.log('Processing ' + yaml)
    })

    process.exit(1)
})