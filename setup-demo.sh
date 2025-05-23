#!/bin/bash

echo "🎯 Setting up Management Dashboard Demo..."
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the JowersAutoService project directory"
    exit 1
fi

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install npm first."
    exit 1
fi

echo "✅ npm found: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "🎉 Demo Setup Complete!"
echo ""
echo "🚀 Ready to Demo! Use these commands:"
echo ""
echo "  Start Demo:     npm run dev"
echo "  Main Website:   http://localhost:5173"
echo "  Admin Login:    http://localhost:5173/admin/login"
echo ""
echo "🔑 Demo Credentials:"
echo "  Username: admin"
echo "  Password: demo123"
echo ""
echo "📝 Demo Flow:"
echo "  1. Show main website and chatbot"
echo "  2. Click 'Admin' link in footer"
echo "  3. Login with demo credentials"  
echo "  4. Walk through dashboard features"
echo "  5. Highlight real-time updates and mobile design"
echo ""
echo "💡 Pro Tips:"
echo "  • Dashboard updates every 10 seconds (watch the 'Last updated' time)"
echo "  • Try the dashboard on mobile - it's fully responsive"
echo "  • All data is realistic but simulated for demo purposes"
echo "  • Use 'View Website' button to go back to main site"
echo ""
echo "🎯 Your client will be impressed! Good luck with the demo! 🚗💼✨"