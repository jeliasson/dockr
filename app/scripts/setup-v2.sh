#!/bin/bash

# Paths
CURRENT_PATH="$(pwd)"
APP_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && cd .. && pwd)"
BIN_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && cd ../bin && pwd)"
CONFIG_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && cd ../../config && pwd)"
SCRIPT_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/$(basename "${BASH_SOURCE[0]}")"
SCRIPTS_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && cd ../scripts && pwd)"

echo
echo "These paths will be used during the installation process:"
echo "  APP_PATH       ${APP_PATH}"
echo "  BIN_PATH       ${BIN_PATH}"
echo "  CONFIG_PATH    ${CONFIG_PATH}"
echo "  SCRIPTS_PATH   ${SCRIPTS_PATH}"
echo "  SCRIPT_PATH    ${SCRIPT_PATH}"
echo

# Verify installation acceptance
if [ -z "${FORCE}" ]; then
    while true; do
        read -p "Do you wish to continue and build dockr image? " yn
        case $yn in
            [Yy]* ) echo && break;;
            [Nn]* ) exit;;
            * ) echo "Please answer yes or no.";;
        esac
    done
fi

# Build dockr
echo "Building dockr image..."
echo "This might take a little while."
docker build -t dockr ${APP_PATH} 2>&1 > /dev/null

# Request sudo permissions
echo "Requesting sudo permissions..."
sudo echo -n ""

# Create symlinks to 'dockr' and 'dr'
echo "Creating symlinks..."
sudo ln --symbolic --force ${BIN_PATH}/dockr.sh /usr/local/bin/dockr
sudo ln --symbolic --force ${BIN_PATH}/dockr.sh /usr/local/bin/dr

# Creating symlinks to 'dockr-v2' and 'dr-v2' (Experimental)
sudo ln --symbolic --force ${BIN_PATH}/dockr-v2.sh /usr/local/bin/dockr-v2
sudo ln --symbolic --force ${BIN_PATH}/dockr-v2.sh /usr/local/bin/dr-v2

# Set owner and permissions
sudo chown -R $(whoami):$(whoami) ${APP_PATH} 2>&1 >/dev/null
sudo chmod +x ${BIN_PATH}/* 2>&1 >/dev/null
sudo chmod +x ${SCRIPTS_PATH}/* 2>&1 >/dev/null

# Finally, print the banner
echo
cat $APP_PATH/banner.txt
echo "       Happy sailin, captain!"
echo

echo "All done!"
echo "Dockr has been installed. You can now run 'dockr-v2', or the even shorter version 'dr-v2'."
