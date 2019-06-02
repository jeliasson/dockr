#!/bin/bash

# Install in home directory
pushd ~ 2>&1 >/dev/null

# Clone the repository
git clone https://github.com/jeliasson/dockr.git

# Make setup script executable
chmod +x ./dockr/app/scripts/setup.sh

# Run setup script
/bin/bash ./dockr/app/scripts/setup.sh

# Remove this script
rm -f ./install.sh

# Return back to the orginal path
popd 2>&1 >/dev/null