#!/bin/bash

# Paths
APP_PATH="$(cd $(dirname $(ls -l $(which dockr)  | awk '{print $NF}')) && cd .. && pwd)"
CONFIG_PATH="$(cd "$(dirname "${APP_PATH}")" && cd config && pwd)"

# Run dockr script
/usr/bin/env node $APP_PATH/dockr.js $*