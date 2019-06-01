#!/usr/bin/env node
const package = require('./package.json');
const program = require('commander')

// Commands
require('./src/cli/run.js')
require('./src/cli/create.js')
require('./src/cli/compose.js')
require('./src/cli/update.js')
require('./src/cli/verify.js')
require('./src/cli/test.js')

// Define program defaults
program.version(package.version)
       .command('help', 'this help section', { isDefault: true })
       .parse(process.argv)

// Debug
if (program.debug) console.log(program.opts());