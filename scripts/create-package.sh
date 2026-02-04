#!/bin/bash
# Zovo Extension Template - Package Creator
# Creates a production-ready zip file for Chrome Web Store submission

set -e

echo ""
echo "  Creating extension package..."
echo ""

# Build production version
npm run build

# Create zip from dist folder
cd dist
zip -r ../extension.zip . -x "*.map"
cd ..

# Get file size
SIZE=$(ls -lh extension.zip | awk '{print $5}')

echo ""
echo "  Package created: extension.zip ($SIZE)"
echo ""
echo "  Ready for Chrome Web Store submission!"
echo ""
