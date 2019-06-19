const consola = require('consola')
const colors = require('colors')

const fs = require('fs')
const shell = require('shelljs')

const YAML = require('yaml')
const yamlValidator = require('yaml-validator')
const yamlLint = require('yaml-lint')
const jsYaml = require('js-yaml')

const path = require('../utils/path')

// Get yaml files
const files = function () {
    const yamlPattern = /.*\/dockr\/config\/([a-zA-Z0-9\-\_]{1,})\/([a-zA-Z0-9\-\_]{1,})\.yaml$/
    const files = []

    shell.find(path.config).filter(function (file) {
        let match = file.match(yamlPattern)

        if (match !== null) {

            const path = match[0]
            const app = match[1]
            const file = match[2]

            files.push({
                path,
                app,
                file,
            })
        }
    })

    return files
}

// Parse all yaml files and it's variables
const parse = function(files) {

    let parsed = `version: "3.4"\nservices:\n`

    let rootConfigPath = `${path.config}/.env`
    let rootConfig = require('dotenv').config({ path: rootConfigPath })

    files.forEach(async function(file) {
        consola.log('- Processing ' + file.app)

        // Construct a path config
        let pathConfig = {
            DATA_PATH: `${path.config}/${file.app}/data`,
            CONFIG_PATH: `${path.config}/${file.app}`
        }

        // Get yaml file content
        let content = fs.readFileSync(file.path, 'utf8')

        // Parse it to an object
        let object = toObject(content)

        // Stringify the object (parsed by the YAML library)
        let yaml = YAML.stringify(object)

        let config = {}
        let output = yaml;

        let appConfigPath = `${path.config}/${file.app}/.env`
        if (fs.existsSync(appConfigPath)) {

            // Get applicaton .env
            let appConfig = require('dotenv').config({ path: appConfigPath })
            
            // Merge root, application and path config
            config = Object.assign(rootConfig.parsed, appConfig.parsed, pathConfig)

        } else {

            // Merge root and path config
            config = Object.assign(rootConfig.parsed, pathConfig)
        }

        output = output.replace(/\$\{.*?\}/g, function (match) {

            // Get the actual environment variable
            let variable = /\$\{(.*?)\}/g
            let exec = variable.exec(match)
            let env = exec[1]

            // Return dotenv variable if not undefined, otherwise set 'undefined-env'
            let value =  (typeof (config[env]) != "undefined") ?
                (config[env]) :
                '!!! undefined-env !!!'

            //consola.log(`- Replaced ${env} with ${value}`)

            return value
        });


        // @todo Fix a way to either merge who docker compose correctly, or continue below
        output.split('\n').map(function (ln) {
            return `\t${ln}` 
        });

        parsed += output
    })

    console.log()

    return parsed
}

// Parse yaml content to js-yaml
const toObject = function(content) {
    let js = jsYaml.load(content)
    
    return js
}


module.exports = {
    files,
    parse,
    toObject
}