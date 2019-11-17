# Dockr

[![Build Status](https://www.travis-ci.com/jeliasson/dockr.svg?branch=master)](https://www.travis-ci.com/jeliasson/dockr)
[![License: MIT](https://img.shields.io/badge/License-MIT-success.svg)](https://opensource.org/licenses/MIT)

`dockr` is CLI tool for managing docker-compose files, currently building on **Ubuntu/Debian**.

The goal of `dockr` is to help you administer docker-compose and your container config files in a easy and predictable way. It's main purpose is to find `compose.yaml`-files in the `config/**/` directory, verify their syntax, and merge them into one to run with `docker-compose`.

You may use this tool how you like. In the end, it's just merging your docker-compose files into one, and can optionally use global and app specific environment variables.

Please note that this project is under development. While it's being used in small production, do not use this in your production environment until you feel comfortable.

#### Topics

-   [Features](#Features)
-   [Getting Started](#Getting-started)
    -   [Installation](#Installation)
        -   [Verify installation](#Verify-installation)
    -   [Create an app](#Create-an-app)
    -   [Use dockr](#Use-dockr)
-   [Environment](#Environment)
    -   [App variables](#App-environment-variables)
    -   [Global variables](#Global-environment-variables)
-   [Contribute](#Contribute)
    -   [Development](#Development)

## Features

-   One-line installation and setup
-   Easily create a new dockr app from a template using `dockr run [app]`
-   Environment variables templating in `compose.yaml` files
-   Verify, merge and docker-compose up using `dockr run`
-   Easy update to latest version of dockr using `dockr update`

## Getting started

### Installation

This one-line installation currently building on **Ubuntu/Debian** using `apt` as package manager.
Before you start the installation, make sure that `git`, `node` and `docker` is installed.

#### One-line installation

As a general note, never trust installation scripts from unknown sources. This includes this project and repository. If you want to inspect the installation scripts, broadly see [install.sh](https://raw.githubusercontent.com/jeliasson/dockr/master/app/scripts/install.sh) and [setup.sh](https://raw.githubusercontent.com/jeliasson/dockr/master/app/scripts/setup.sh). You may also check out the [latest builds](https://www.travis-ci.com/jeliasson/dockr) to see what to expect.

```bash
wget -Nnv https://raw.githubusercontent.com/jeliasson/dockr/master/app/scripts/install.sh 2>&1 >/dev/null && bash install.sh
```

## Verify installation
Make sure everything went fine by either running `dockr` or `dockr info`. You can also use the alias `dr`, e.g. `dr info`.
```text
$ dockr

Usage: dockr [options] [command]

Options:
  -V, --version  output the version number
  -h, --help     output usage information

Commands:
  run            verify, merge and compose up
  edit [app]     edit app composer.yaml
  logs [app]     dockr logs, or dockr app logs
  create [app]   create a new app with boilerplates
  compose [cmd]  docker-compose wrapper
  backup         make a backup of dockr
  config         cd to dockr config directory
  info           info about the dockr installation
  logs [app]     dockr logs, or dockr app logs
  update         update dockr
  verify         verify syntax of all yaml files
  test           test docker-compose files
  clean          clean temporary generated files
  help           this help section
  help [cmd]     display help for [cmd]
```

## Create an app

In dockr, a directory in `config/` is refered as in **_app_**, e.g. app `portainer` will reside in `config/portainer`. To create an app, run `docker create <app>`.

The generated docker-compose file `config/<app>/compose.yaml` should contain your normal docker-compose directives, and you can use [environment variables](#environment) in these directives.

## Use Dockr

Running `dockr run` will verify, merge and `docker-compose up` your apps, e.g.

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

#### Generated docker-compose.yaml

Generated docker-compose file will be placed in the root path of dockr, by default `~/dockr/docker-compose.yaml`.

#### Docker-compose and orphans

`dockr run` will effectively run `docker-compose -f ~/docker/docker-compose.yaml -d --remove-orphans up` once app yaml files has been parsed.

By passing `--remove-orphans`, docker will delete containers that have been removed from the same [docker compose stack](https://docs.docker.com/get-started/part5/). In this case, containers that has been created using dockr. It will not delete containers you've created outside of dockr.

## Environment

During `dockr run`, when generating app docker-compose files, dockr will bring envioronment runtime such as [app environment variabels](#app-environment-variables) and [global environment variabels](#global-environment-variables) and have them merged with placeholders in respective `compose.yaml` file.

### App environment variables

Environment variables is defined in the `.env` file in your app directory. If you created the app using `dockr run`, this file has been created for you. Example syntax that would set environment variable `PORT` to value `8080`.

```bash
PORT=8080
```

These environment variables may be used in `compose.yaml` files, e.g. `${PORT}` would result in `8080`.

### Global environment variables

It's recommended to use globally defined and generated environment variables, such as `${DATA_DIR}`, that would return the absolute `data` path to the app during merge.

| Scope  | Variable          | Value                            | Description                                                       |
| ------ | ----------------- | -------------------------------- | ----------------------------------------------------------------- |
| Global | `PUID`            | `1000`                           | Default system user id to run docker containers.                  |
| Global | `PGID`            | `1000`                           | Default system group id to run docker containers.                 |
| Global | `DOCKR_APP_NAME`  | `[app]`                          | App name during merge process of yaml files                       |
| Global | `DOCKR_APP_PATH`  | `/[...]/config/[app]`            | Absolute app path during merge process of yaml files              |
| Global | `DOCKR_DATA_PATH` | `/[...]/dockr/config/<app>/data` | Absolute path to apps `data` directory                            |
| Global | `DOCKR_DISABLED`  | `<not set>`                      | Disables parse of `compose.yaml` app if env set                   |
| Global | `TZ`              | `Europe/Malta`                   | Timezone                                                          |
| App    | `PORT`            | `8080`                           | Example described in [App variables](#App-environment-variables). |
## Use Dockr using container (experimental)

Working on having the `dockr` command wrapped to run the dockr image, and the end result would be to use dockr without installing any dependencies locally, besides docker of course.

#### docker run

Before the image is stable and ready for having an alias for `dockr`, we'll build the image and run it manually.

```
cd ~/docker
docker build -t dockr app
docker run -v config:/config dockr info
```

#### docker-compose (Example)

```
cd ~/dockr
docker-compose --remove-orphans -f ./app/docker-compose.yaml up
```

## Contribute

Feel free to fork and send a [Pull Request](pulls/) if you see something that can be made better. ❤️

### Development

To setup your development dockr, run `sh ./app/scripts/install-dev.sh`. What's different between the original installation script is basically checking out the dev-branch.
