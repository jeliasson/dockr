const consola = require('consola')
const colors = require('colors')

const fs = require('fs')
const program = require('commander')
const shell = require('shelljs')

const path = require('../../utils/path')

program.command('create [app]', 'create a new app with boilerplates')

program.on('command:create', function (args) {

    // Check for required arguments
    if (!args[0]) {
        consola.error(`Requires one argument, the app name.\n` + `E.g. dockr create [app]`.gray)

        process.exit(0)
    }

    const appName = args[0]
    const appPath = `${path.config}/${appName}`
    const dockerComposeTemplatePath = `${path.app.templates}/docker-compose`

    try {

        // @todo: Make a retroactive copydir
        if (!fs.existsSync(`${appPath}`)) {

            // Create app root directory
            fs.mkdirSync(`${appPath}`)

            // Create data directory
            if (!fs.existsSync(`${appPath}/data`)) {
                fs.mkdirSync(`${appPath}/data`)
            }

            // Files
            const files = [
                `compose.yaml`,
                `.env`
            ]

            // Copy
            files.forEach(function (file) {
                if (!fs.existsSync(`${appPath}/${file}`)) {
                    fs.copyFileSync(`${dockerComposeTemplatePath}/${file}`, `${appPath}/${file}`)
                }
            })

            // Get yaml file content
            let content = fs.readFileSync(`${appPath}/compose.yaml`, 'utf8');

            // Replacements
            const replacements = {
                APP: `${appName}`
            }

            // Replace __VARIABLES__ with those in replacements
            output = content.replace(/\_\_.*?\_\_/g, function (match) {

                // Get the actual environment variable
                let variable = /\_\_(.*?)\_\_/g
                let exec = variable.exec(match)
                let env = exec[1]

                return replacements[env]
            });

            consola.success(`Created app '${appName}' in directory ${path.config}/${appName}`)

            process.exit(0)

        } else {
            consola.error(`${appName} already exists. Aborting.`)

            process.exit(1)
        }
    }
    catch (err) {
        consola.log(err)
    }

    process.exit(0)
})