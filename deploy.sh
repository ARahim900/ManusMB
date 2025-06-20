#!/bin/bash

# Muscat Bay Management System - Deployment Script
echo "🚀 Starting deployment process for Muscat Bay Management System..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run build
echo "🔨 Building application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Build files are in the 'dist' directory"
    echo ""
    echo "🌐 To deploy to Netlify:"
    echo "1. Install Netlify CLI: npm install -g netlify-cli"
    echo "2. Login to Netlify: netlify login"
    echo "3. Deploy: netlify deploy --prod --dir=dist"
    echo ""
    echo "Or simply drag and drop the 'dist' folder to Netlify dashboard"
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi 