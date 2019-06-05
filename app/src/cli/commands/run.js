const consola = require('consola')

const colors = require('colors')
const program = require('commander')

const shell = require('shelljs')

const path = require('../../utils/path')

program.command('run', 'verify, merge and run docker-compose')

program.on('command:run', function (dir) {

    console.log('Finding yaml files in config directory...')

    const yamlPattern = /.*\/dockr\/config\/([a-zA-Z0-9\-\_]{1,})\/([a-zA-Z0-9\-\_]{1,})\.yaml$/
    const yamlFiles = []

    shell.find(path.config).filter(function (file) {
        let match = file.match(yamlPattern)

        if (match !== null) {
            
            const path = match[0]
            const app = match[1]
            const file = match[2]

            yamlFiles.push({
                path,
                app,
                file,
            })
        }
    })

    yamlFiles.forEach(function(yaml) {
        consola.log('Processing ' + yaml.app + ' and it\'s file ' + yaml.file + '.yaml')
    })

    process.exit(1)
})