#!/bin/bash
echo "Updating Legal Dictionary API..."

# Navigate to app directory
cd /var/www/legal-dictionary-api

# Pull latest changes
git pull

# Install dependencies
npm install

# Build application
npm run build

# Restart PM2 process
pm2 restart legal-dictionary-api

echo "Update completed!" 