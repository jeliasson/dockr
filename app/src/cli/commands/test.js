const consola = require('consola')
const colors = require('colors')

const async = require('async')
const fs = require('fs')
const program = require('commander')


const yamlValidator = require('yaml-validator')
const yamlLint = require('yaml-lint')
const jsYaml = require('js-yaml')

const path = require('../../utils/path')
const yaml = require('../../logic/yaml')

program.command('test', 'just a test command')

program.on('command:test', function () {

    consola.warn('This command is not yet implemented')
    consola.info(`Linting yaml files...`)

    const parse = yaml.parse(yaml.files())
    console.log(parse)
    
    process.exit(1)
})