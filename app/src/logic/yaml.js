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

    // Root .env config
    const rootConfigPath = `${path.config}/.env`
    const rootConfig = require('dotenv').config({ path: rootConfigPath })

    // Create output directory if not already exists
    const outputPath = `${path.app.tmp}/yaml-parse-staging`
    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, 0700);
    }

    let outputFiles = []

    // Foreach all identified yaml files
    files.forEach(function(file) {
        consola.log(`- `.gray + `Processing ${file.app}`)

        // Construct a path config
        let dockrAppConfig = {
            DOCKR_APP_NAME: `${file.app}`,
            DOCKR_APP_PATH: `${path.config}/${file.app}`,
            DOCKR_DATA_PATH: `${path.config}/${file.app}/data`,
            DOCKR_CONFIG_PATH: `${path.config}/${file.app}`
        }

        // Verify that the data directory exists
        if (!fs.existsSync(`${dockrAppConfig.DOCKR_DATA_PATH}`)) {
            consola.error(`Missing 'data' directory for ${file.app}\nSuggested fix: mkdir ${dockrAppConfig.DOCKR_DATA_PATH}`)

            process.exit(1)
        }

        // Get yaml file content
        let content = fs.readFileSync(file.path, 'utf8');

        // Parse it to an object
        let object = toObject(content)
        
        // @todo: Add environment variable to identify dockr generated compose
        // e.g. DOCKR_GENERATED = YYYY-MM-DD HH:II:SS

        // Stringify the object (parsed by the YAML library)
        let yaml = YAML.stringify(object)

        let config = {}
        let output = yaml

        // App .env config
        let appConfigPath = `${path.config}/${file.app}/.env`
        if (fs.existsSync(appConfigPath)) {

            // Get applicaton .env
            let appConfig = require('dotenv').config({ path: appConfigPath })
            
            // Merge root, application and path config
            config = Object.assign(rootConfig.parsed, dockrAppConfig, appConfig.parsed)

        } else {

            // Merge root and path config
            config = Object.assign(rootConfig.parsed, dockrAppConfig)
        }

        // Replace ${VARIABLES} with those merged in config
        output = output.replace(/\$\{.*?\}/g, function (match) {

            // Get the actual environment variable
            let variable = /\$\{(.*?)\}/g
            let exec = variable.exec(match)
            let env = exec[1]

            // Return dotenv variable if not undefined, otherwise set 'undefined-env'
            if (typeof (config[env]) != "undefined") {
                let value = config[env]
            } else {
                let value = '!!! undefined-env !!!'

                consola.error(`Use of undefined env ${env} in ${file.app}'s compose.yaml\nAdd ${env}=<value> in ${appConfigPath}`)

                process.exit(1)
            }
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

        // Save final yaml file
        let outputFile = `${outputPath}/${file.app}-${file.file}.yaml`
        fs.writeFileSync(outputFile, output)
        outputFiles.push(outputFile)
    })
    console.log()

    // Generate docker compose arguments and output file
    const outputFilesAsArgument = outputFiles.map(function(file) { return `-f ${file}` }).join(' ')
    const outputFileMerged = `${path.docker.compose}`
    
    // Merge files
    const mergeCommand = `docker-compose ${outputFilesAsArgument} config > ${outputFileMerged}`
    shell.exec(mergeCommand, { silent: false })

    // Clean up
    /*
    outputFiles.forEach(function(file) {
        fs.unlinkSync(file)
    })
    */

    consola.success('Merge of files completed.')

    return outputFileMerged
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