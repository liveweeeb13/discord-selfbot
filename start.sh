#!/bin/sh

if [ ! -d "node_modules" ]; then
        echo "Installation des dependances..."
        npm install
fi

echo "Demarrage du projet..."
npm run start

read -p "Appuyez sur une touche pour continuer..."
