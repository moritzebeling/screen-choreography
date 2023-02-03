#!/bin/bash

cd ~/screens

echo "🚧 Start deploy script"
echo pwd

echo "🛑 Stop server"

pm2 delete all

echo "⬇️ Pull repository"

git pull

echo "🔨 Build project"

npm install
npm run build

echo "🚀 Start server"

pm2 start server/server.js

echo "✅ End deploy script"