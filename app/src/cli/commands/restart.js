const consola = require('consola')
const colors = require('colors')

const program = require('commander')

const shell = require('shelljs')

const path = require('../../utils/path')
const nonl = require('../../utils/helpers/nonl')
const yaml = require('../../logic/yaml')

program.command('restart', 'restart all docker containers')

program.on('command:restart', function (dir) {

    consola.warn('This command is not yet completed')

    if (!shell.which('docker-compose')) {
        consola.error('Sorry, this command requires docker-compose');

        process.exit(1);
    }

    const runningContainerIds = shell.exec(`docker ps -q`, { silent: true });
    let runningContainerIdsSplit = runningContainerIds.split('\n');
    console.log(runningContainerIdsSplit);

    runningContainerIdsSplit.forEach(function (id) {

        let runningContainerInspect = shell.exec(`docker inspect --format='{{.Name}}' $(sudo docker ps -aq --no-trunc) ${id}`);
        console.log(runningContainerInspect);

        console.log(`Restarting ${id}...`)
        // docker inspect --format='{{.Name}}' $(sudo docker ps -aq --no-trunc)

        if (shell.exec(`docker restart ${id} 2>&1 > /dev/null`).code !== 0) {

            consola.info(`${id} does not seem to be running...?`)

        }


    })

    process.exit(0)
})