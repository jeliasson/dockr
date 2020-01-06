#!/bin/bash

# Paths
APP_PATH="$(cd $(dirname $(ls -l $(which dockr)  | awk '{print $NF}')) && cd .. && pwd)"
DOCKR_CONFIG_PATH="$(cd "$(dirname "${APP_PATH}")" && cd config && pwd)"

# Run dockr
/usr/bin/env node $APP_PATH/dockr.js $*
