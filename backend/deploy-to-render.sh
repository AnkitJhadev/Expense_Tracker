#!/bin/bash

# 🚀 Render Deployment Script for Expense Tracker Backend
# This script helps prepare your backend for Render deployment

echo "🚀 Preparing Expense Tracker Backend for Render Deployment"
echo "=========================================================="

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "Please create a .env file with your configuration."
    exit 1
fi

# Check if package.json exists
if [ ! -f package.json ]; then
    echo "❌ Error: package.json not found!"
    echo "Please make sure you're in the backend directory."
    exit 1
fi

# Check if server.js exists
if [ ! -f server.js ]; then
    echo "❌ Error: server.js not found!"
    echo "Please make sure you're in the backend directory."
    exit 1
fi

echo "✅ All required files found!"

# Check dependencies
echo ""
echo "📦 Checking dependencies..."
if npm list --depth=0 > /dev/null 2>&1; then
    echo "✅ Dependencies are installed"
else
    echo "⚠️  Dependencies not installed. Running npm install..."
    npm install
fi

# Test the server locally
echo ""
echo "🧪 Testing server locally..."
echo "Starting server on port 5000..."
echo "Press Ctrl+C to stop the test server"
echo ""

# Start server in background
node server.js &
SERVER_PID=$!

# Wait a moment for server to start
sleep 3

# Test health endpoint
if curl -s http://localhost:5000/api/health > /dev/null; then
    echo "✅ Server is running and health check passed!"
else
    echo "❌ Health check failed. Please check your server configuration."
    kill $SERVER_PID 2>/dev/null
    exit 1
fi

# Stop the test server
kill $SERVER_PID 2>/dev/null

echo ""
echo "🎉 Backend is ready for deployment!"
echo ""
echo "📋 Next Steps:"
echo "1. Push your code to GitHub"
echo "2. Go to https://render.com"
echo "3. Create a new Web Service"
echo "4. Connect your GitHub repository"
echo "5. Configure environment variables:"
echo "   - NODE_ENV=production"
echo "   - MONGODB_URI=your_mongodb_connection_string"
echo "   - JWT_SECRET=your_jwt_secret"
echo "   - PORT=10000"
echo "6. Set Build Command: npm install"
echo "7. Set Start Command: npm start"
echo "8. Deploy!"
echo ""
echo "📖 For detailed instructions, see RENDER_DEPLOYMENT.md"
echo ""
echo "🔗 Your API will be available at: https://your-app-name.onrender.com" 