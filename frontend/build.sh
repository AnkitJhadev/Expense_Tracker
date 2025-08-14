#!/bin/bash

# Set environment variables
export CI=false
export GENERATE_SOURCEMAP=false

# Install dependencies
npm install

# Run build
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "Build completed successfully!"
    exit 0
else
    echo "Build failed!"
    exit 1
fi
