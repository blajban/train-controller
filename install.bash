#!/bin/bash

# Needs to be updated!

DIR="$(dirname "$0")"

echo "--- Installing... ---"
echo

# Change to backend directory
cd "$DIR/backend/"
npm install
./db/reset_db.bash
cp .env-example .env
echo
echo "--- Don't forget to change api key in /backend/.env ---"

#cd "$DIR"