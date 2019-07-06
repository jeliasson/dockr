#!/usr/bin/env node
const package = require('./package.json');
const program = require('commander')

// Commands
require('./src/cli/commands')

// Define program defaults
program.version(package.version)
       .command('help', 'this help section', { isDefault: true })
       .parse(process.argv)

// Debug
if (program.debug) console.log(program.opts());