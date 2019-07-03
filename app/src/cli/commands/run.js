const consola = require('consola')
const colors = require('colors')

const fs = require('fs')
const program = require('commander')
const shell = require('shelljs')

const path = require('../../utils/path')
const yaml = require('../../logic/yaml')

program.command('run', 'verify, merge and compose up').action(async function (dir) {

    consola.warn('This command is work in progress.')
    
    consola.info('Finding yaml files in config directory...')
    consola.log()

    // Parse
    const outputFileMerged = yaml.parse(yaml.files())
    const cmd = `docker-compose -f ${outputFileMerged} up -d`

    console.log()
    consola.info('Running docker-compose...')
    //console.log(`Command: ${cmd}`) // @todo: Add to debugging switch
    console.log()

    shell.exec(cmd)

    process.exit(1)
})