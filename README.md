# Dockr
The goal of **dockr** is to help you administer docker-compose and config files in a easy and predicatable way. It's main purpose is to find `.yaml`-files in the `config/` directory, verify their syntax, and merge them into one to run.

## Getting started
### Installation
Before you start the installation, make sure that `git` and `docker` is installed. 
Installation script is work in progress. Please open any issues that you may see.

#### One-time run
```bash
wget -O - https://raw.githubusercontent.com/jeliasson/dockr/master/app/scripts/install.sh | bash
```

## Use Dockr
Use `dockr` or alias `dr`.
```bash
$ dockr

Usage: dockr [options] [command]

Options:
  -V, --version  output the version number
  -h, --help     output usage information

Commands:
  run            verify, merge and run docker-compose
  verify         verify syntax of all yaml files
  help           this help section
  help [cmd]     display help for [cmd]
```


## Contribute
Feel free to fork and send a Pull Request if you see something that can be made better.