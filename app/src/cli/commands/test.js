const consola = require('consola')
const colors = require('colors')

const fs = require('fs')
const program = require('commander')
const YamlValidator = require('yaml-validator');

const path = require('../../utils/path')
const yamlConfigs = require('../../logic/compose/yamlConfigs')

program.command('test', 'just a test command')

program.on('command:test', function () {

    consola.warn('This command is not yet implemented')
    consola.info(`Linting yaml files...`)

    const yamlFiles = []
    yamlConfigs.forEach(function (yaml) {

        yamlFiles.push(`${path.config}/${yaml.app}/${yaml.file}.yaml`)
    })

    const options = {
        log: true,
        logFile: `${path.logs}/yaml-validator.txt`,
        structure: false,
        onWarning: null,
        writeJson: false
    };

    const validator = new YamlValidator(options)

    console.log(validator.validate(yamlFiles))
    console.log(validator.report())
    
    process.exit(1)
})