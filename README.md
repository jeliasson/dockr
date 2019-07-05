# Dockr
The goal of **dockr** is to help you administer docker-compose and your container config files in a easy and predictable way. It's main purpose is to find `compose.yaml`-files in the `config/**/` directory, verify their syntax, and merge them into one to run.

You may use this tool how you like. In the end, it's just merging your docker-compose files into one, and can optionally use global and app specific environment variables.

Please note that this project is under development. While it's being used in small production, do not use this in your production environment until you feel comfortable.

## Getting started
### Installation
Installation script is work in progress. Please open any issues that you may see.

Before you start the installation, make sure that `git` and `docker` is installed. 

#### One-line installation
As a general note, never trust installation scripts from unknown sources. This includes this project and repository. If you want to inspect the installation scripts, broadly see [install.sh](https://raw.githubusercontent.com/jeliasson/dockr/master/app/scripts/install.sh) and [setup.sh](https://raw.githubusercontent.com/jeliasson/dockr/master/app/scripts/setup.sh).

```bash
wget -Nnv https://raw.githubusercontent.com/jeliasson/dockr/master/app/scripts/install.sh 2>&1 >/dev/null && bash install.sh
```

## Verify installation
Make sure everything went fine by either running `dockr` or `dockr info`. You can also use the alias `dr`, e.g. `dr info`.
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

## Create a app (**Work in progress**)
In dockr, a single docker container is refered as in _app_. App directories is created in `config/`, e.g. `config/portainer`.

Before we have a working command for creating a new app, we'll do this manually.

1. Create a directory in `config/` with your container name, e.g. `config/portainer`

2. Create a `data` directory in the app, e.g. `config/portainer/data`

3. Create a `compose.yaml` file in the app, e.g. `config/portainer/compose.yaml`. 

`compose.yaml` should contain your normal docker-compose directives, and you can use [environment variables](#environment-variables) generated by dockr, scope named _Global_, or app specific environment variables. 

App specific environment variables overrides global environment variables.

## Use Dockr
Running `dockr run` will verify, merge and compose up your apps, e.g.
```bash
$ dr run

ℹ Finding yaml files in config directory...
                 
- Processing dockr-hello
- Processing portainer

✔ Merge of files completed.

ℹ Running docker-compose... 

dockr-hello is up-to-date
portainer is up-to-date
```

_In above example, both images were already built and running._


## Environment variables

Environment variables is defined by creating a `.env` file in your app directory. Example syntax that would set environment variable `PORT` to value `8080`.
```bash
PORT=8080
```

These environment variables may be used in `compose.yaml` files, e.g. `${PORT}` would result in `8080`.

### Global environment variables
It's recommended to use globally defined and generated environment variables, such as `${DATA_DIR}`, that would return the absolute `data` path to the app during merge.

| Scope      | Variable      | Value | Description           |
|----------- | ------------- | ------------- | --------------------- |
| Global     | `PUID`        | `1000`        | Default system user id to run docker containers. |
| Global     | `PGID`        | `1000`        | Default system group id to run docker containers. |
| Global     | `DATA_DIR`        | `/[...]/dockr/config/<app>/data`        | Absolute path to apps `data` directory |
| Global     | `APP`         | `[app]`        | App name during merge process of yaml files |
| Global     | `TZ`          | `Europe/Malta` | Timezone |
| App        | `PORT`        | `8080`         | Example described in [Environment variables](#environment-variables). |

## Use Dockr using container (experimental)
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
- [X] Run command
- [ ] Optimize docker compose boilerplate (prefix, networks, etc)
- [ ] Use dockr image as wrapper for command `dockr` and `dr`.
- [ ] Web interface w/ config editor
- [ ] Adding a few basic templates
- [ ] Adding something that would be like an marketplace

## Contribute
Feel free to fork and send a [Pull Request](pulls/) if you see something that can be made better. ❤️