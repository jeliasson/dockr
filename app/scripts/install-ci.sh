#!/bin/bash

echo ""
echo "#"
echo "# Setup"
echo "#"
/bin/bash ./app/scripts/setup$1.sh

echo ""
echo "#"
echo "# Create dockr test-app"
echo "#"
dockr$1 create test-app

echo ""
echo "#"
echo "# Show dockr information"
echo "#"
dockr$1 info

echo ""
echo "#"
echo "# Show dockr debug"
echo "#"
dockr$1 debug

echo ""
echo "#"
echo "# Update dockr"
echo "#"
dockr$1 update

echo ""
echo "#"
echo "# Run dockr"
echo "#"
dockr$1 run

echo ""
echo "#"
echo "# Restart docker containers"
echo "#"
dockr$1 restart

echo ""
echo "#"
echo "# Logs for test app"
echo "#"
dockr$1 logs test

echo ""
echo "#"
echo "# Backup dockr"
echo "#"
dockr$1 backup

echo ""
echo "#"
echo "# Bring down docker comtainers"
echo "#"
dockr$1 compose down

echo "#"
echo "# Done"
echo "#"
