#!/bin/bash

cd ~/screens

echo "🚧 Start deploy script"
echo pwd

echo "🛑 Stop server"

pm2 delete screens

echo "⬇️ Pull repository"

git pull

echo "🔨 Build project"

nvm use
npm install
npm run build

echo "🚀 Start server"

pm2 start pm2.config.cjs

echo "✅ End deploy script"