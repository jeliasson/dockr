#!/bin/bash

echo ""
echo "#"
echo "# One-line install"
echo "#"
wget -Nnv https://raw.githubusercontent.com/jeliasson/dockr/master/app/scripts/install.sh 2>&1 >/dev/null && bash install.sh

echo ""
echo "#"
echo "# Create dockr test-app"
echo "#"
dockr create test-app

echo ""
echo "#"
echo "# Show dockr information"
echo "#"
dockr info

echo ""
echo "#"
echo "# Update dockr"
echo "#"
dockr update

echo ""
echo "#"
echo "# Run dockr"
echo "#"
dockr run

echo ""
echo "#"
echo "# Logs for test app"
echo "#"
dockr logs test

echo ""
echo "#"
echo "# Backup dockr"
echo "#"
dockr backup

echo ""
echo "#"
echo "# Bring down docker comtainers"
echo "#"
dockr compose down

echo "#"
echo "# Done"
echo "#"