# Dockr
The goal of **dockr** is to help you administer docker-compose and config files in a easy and predictable way. It's main purpose is to find `.yaml`-files in the `config/` directory, verify their syntax, and merge them into one to run.

You may use this tool how you like. In the end, it's just merging your docker-compose files into one, and mapping your respective container config paths.

## Getting started
### Installation
Before you start the installation, make sure that `git` and `docker` is installed. 
Installation script is work in progress. Please open any issues that you may see.

#### One-line installation
If you want to inspect the installation scripts, see [install.sh](https://raw.githubusercontent.com/jeliasson/dockr/master/app/scripts/install.sh) and [setup.sh](https://raw.githubusercontent.com/jeliasson/dockr/master/app/scripts/setup.sh).
```bash
wget -Nnv https://raw.githubusercontent.com/jeliasson/dockr/master/app/scripts/install.sh 2>&1 >/dev/null && bash install.sh
```

## Use Dockr
Use `dockr` or alias `dr`.
```text
$ dockr

Options:
  -V, --version  output the version number
  -h, --help     output usage information

Commands:
  run            verify, merge and compose up
  create [app]   create a new app with boilerplates
  compose [cmd]  docker-compose wrapper
  backup         make a backup of dockr
  config         cd to dockr config directory
  info           info about the dockr installation
  update         update dockr
  verify         verify syntax of all yaml files
  test           just a test command
  help           this help section
```

### Use Dockr using container (experimental)
Working on having the `dockr` command wrapped to run the dockr image, and the end result would be to use dockr without installing any dependencies locally, besides docker of course. 

#### docker run
Before the image is stable and ready for having an alias for `dockr`, we'll build the image and run it manually.
```
cd ~/docker                               # Go to root path of dockr
docker build -t dockr app                 # Build the image and tag it 'dockr'
docker run -v config:/config dockr info   # Run 'dockr info' with config/ mounted
```

#### docker-compose (Example)
```
cd ~/dockr
docker-compose -f ./app/docker-compose.yaml up
```

## Todo
- [x] Installation and setup script
- [x] Update command
- [x] Info command
- [ ] Test command w/ yaml linting
- [x] Dockerfile
- [x] Docker Compose command
- [ ] Run command
- [ ] Optimize docker compose boilerplate (networks, shares etc)
- [ ] Use dockr image as wrapper for command `dockr` and `dr`.
- [ ] Web interface w/ config editor
- [ ] Adding a few basic templates

## Contribute
Feel free to fork and send a [Pull Request](pulls/) if you see something that can be made better.