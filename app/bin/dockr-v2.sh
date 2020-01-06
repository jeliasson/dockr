#!/bin/bash

#
# Experimental (dockr-cli)
#
# This is a experimental feature to wrap dockr around a Docker image containing dockr, namely dockr-cli.
# With this you remove dockr runtime dependencies being installed on the host, such as node.
#
# If this plays out nicely, it will probably end up replacing the current 'dockr' and 'dr' command/alias.
#

# Paths
APP_PATH="$(cd $(dirname $(ls -l $(which dockr)  | awk '{print $NF}')) && cd .. && pwd)"
DOCKR_CONFIG_PATH="$(cd "$(dirname "${APP_PATH}")" && cd config && pwd)"

# Run dockr
docker run -it -v ${DOCKR_CONFIG_PATH}:/dockr/config dockr $*
