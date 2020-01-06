#!/bin/bash

echo ""
echo "#"
echo "# Setup"
echo "#"
/bin/bash $1

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
echo "# Show dockr debug"
echo "#"
dockr debug

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
echo "# Restart docker containers"
echo "#"
dockr restart

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
