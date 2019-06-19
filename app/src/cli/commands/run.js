const consola = require('consola')
const colors = require('colors')

const fs = require('fs')
const program = require('commander')
const shell = require('shelljs')

const path = require('../../utils/path')
const yaml = require('../../logic/yaml')

program.command('run', 'verify, merge and compose up')

program.on('command:run', function (dir) {

    consola.warn('This command is work in progress.')
    
    consola.info('Finding yaml files in config directory...')
    consola.log()

    // Parse
    const parsed = yaml.parse(yaml.files())

    // Write file to 
    const generatedYaml = `${path.root}/docker-compose.yaml`
    fs.writeFileSync(generatedYaml, parsed)

    console.log(`docker-compose -f ${generatedYaml} up`)
    shell.exec(`docker-compose -f ${generatedYaml} up`)

    process.exit(1)
})