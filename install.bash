#!/bin/bash

DIR="$(dirname "$0")"

echo "--- Installing... ---"
echo

# Change to backend directory
cd "$DIR/backend/"
npm install
cp .env-example .env

# Change to frontend directory
cd "$DIR/frontend/"
npm install
cp .env-example .env

echo
echo "--- Done! ---"