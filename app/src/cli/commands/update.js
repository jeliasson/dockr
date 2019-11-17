const consola = require('consola')
const colors = require('colors')

const program = require('commander')

const shell = require('shelljs')

const path = require('../../utils/path')

program.command('update', 'update dockr')

program.on('command:update', function (dir) {

    consola.info('Checking if git is installed on the system...')
    if (!shell.which('git')) {
        shell.echo('Sorry, this command requires git');
        process.exit(1);
    }

    consola.info('Pulling the most recent changes from the repository...')
    if (shell.exec('(cd ' + path.root + ' && git pull)').code !== 0) {

        consola.error('Something went wrong trying to pull')

        process.exit(1)
    } else {

        consola.log()
        consola.success('All good!')
    }

    shell.exit(1);
    process.exit(0)
})