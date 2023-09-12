#!/bin/bash

DIR="$(dirname "$0")"

echo "--- Installing... ---"
echo

# Change to backend directory
cd "$DIR/backend/"
npm install
./db/reset_db.bash
cp .env-example .env

# Change to frontend directory
cd "$DIR/frontend/"
npm install

echo
echo "--- Don't forget to change api key in /backend/.env ---"