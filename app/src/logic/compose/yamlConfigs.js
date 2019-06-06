const consola = require('consola')

const colors = require('colors')

const shell = require('shelljs')

const path = require('../../utils/path')

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

module.exports = yamlFiles