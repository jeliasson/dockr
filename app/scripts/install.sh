#!/bin/bash

# Install in home directory
pushd ~

# Clone the repository
git clone https://github.com/jeliasson/dockr.git

# Make setup script executable
chmod +x ./dockr/app/scripts/setup.sh

# Run setup script
./dockr/app/scripts/setup.sh

# Return back to the orginal path
popd