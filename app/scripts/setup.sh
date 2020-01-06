#!/bin/bash

# Paths
CURRENT_PATH="$(pwd)"
APP_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && cd .. && pwd)"
BIN_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && cd ../bin && pwd)"
CONFIG_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && cd ../../config && pwd)"
SCRIPT_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/$(basename "${BASH_SOURCE[0]}")"
SCRIPTS_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && cd ../scripts && pwd)"

echo
echo "These paths will be used during the installation process"
echo "  SCRIPT_PATH    ${SCRIPT_PATH}"
echo "  APP_PATH       ${APP_PATH}"
echo "  BIN_PATH       ${BIN_PATH}"
echo "  CONFIG_PATH    ${CONFIG_PATH}"
echo "  SCRIPTS_PATH   ${SCRIPTS_PATH}"
echo

# Package manager detection files
declare -A OS_PACKAGE_MANAGER_DETECT;
OS_PACKAGE_MANAGER_DETECT[/etc/redhat-release]=yum
OS_PACKAGE_MANAGER_DETECT[/etc/arch-release]=pacman
OS_PACKAGE_MANAGER_DETECT[/etc/gentoo-release]=emerge
OS_PACKAGE_MANAGER_DETECT[/etc/SuSE-release]=zypp
OS_PACKAGE_MANAGER_DETECT[/etc/debian_version]=apt-get

# Define package manager current installation state
declare -A OS_RELEASE_DETECT;
OS_RELEASE_DETECT[/etc/redhat-release]=untested
OS_RELEASE_DETECT[/etc/arch-release]=untested
OS_RELEASE_DETECT[/etc/gentoo-release]=untested
OS_RELEASE_DETECT[/etc/SuSE-release]=untested
OS_RELEASE_DETECT[/etc/debian_version]=stable

# Detect package manager
for f in ${!OS_PACKAGE_MANAGER_DETECT[@]}
do
    if [[ -f $f ]];then
        OS_PACKAGE_MANAGER="${OS_PACKAGE_MANAGER_DETECT[$f]}"
        OS_RELEASE="${OS_RELEASE_DETECT[$f]}"
    fi
done

# Print detected package manager and state
echo Package Installation Manager: ${OS_PACKAGE_MANAGER}
echo Installation script state: ${OS_RELEASE}
echo

# Verify installation acceptance
if [ -z "${FORCE}" ]; then
    while true; do
        read -p "Do you wish to continue with this installation? " yn
        case $yn in
            [Yy]* ) echo && break;;
            [Nn]* ) exit;;
            * ) echo "Please answer yes or no.";;
        esac
    done
fi

# Request sudo permissions
echo "Requesting sudo permissions..."
sudo echo -n ""

# Install node dependencies
echo "Installing node dependencies..."
sudo $OS_PACKAGE_MANAGER update 2>&1 >/dev/null
sudo $OS_PACKAGE_MANAGER install -f nodejs npm 2>&1 >/dev/null

# Installing npm dependencies
echo "Installing npm dependencies..."
pushd $APP_PATH 2>&1 >/dev/null
npm install 2>&1 >/dev/null
popd 2>&1 >/dev/null

# Create symlinks to 'dockr' and 'dr'
echo "Creating symlinks..."
sudo ln --symbolic --force ${BIN_PATH}/dockr.sh /usr/local/bin/dockr
sudo ln --symbolic --force ${BIN_PATH}/dockr.sh /usr/local/bin/dr

# Creating symlinks to 'dockr-cli' and 'dr-cli' (Experimental)
sudo ln --symbolic --force ${BIN_PATH}/dockr-cli.sh /usr/local/bin/dockr-cli
sudo ln --symbolic --force ${BIN_PATH}/dockr-cli.sh /usr/local/bin/dr-cli

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
echo "Dockr has been installed. You can now run 'dockr', or the even shorter version 'dr'."
