#!/bin/bash

echo "🤖 Setting up Jower's Auto Service Chatbot..."
echo ""

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm found"
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

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "🔑 Creating environment file..."
    cp .env.example .env.local
    echo "✅ Created .env.local from .env.example"
    echo ""
    echo "🚨 IMPORTANT: Edit .env.local and add your API key!"
    echo ""
    echo "Quick setup options:"
    echo "1. 🏆 Groq (Fastest & Cheapest): https://console.groq.com/"
    echo "2. Together.ai (Very Cheap): https://api.together.xyz/"
    echo "3. Anthropic Claude (High Quality): https://console.anthropic.com/"
    echo "4. OpenAI (Most Popular): https://platform.openai.com/api-keys"
    echo ""
else
    echo "✅ .env.local already exists"
fi

echo "🎯 Setup complete! Next steps:"
echo ""
echo "1. Edit .env.local with your API key"
echo "2. Run: npm run dev"
echo "3. Visit: http://localhost:5173"
echo "4. Look for the chat bubble in the bottom-right corner!"
echo ""
echo "💡 See CHATBOT_README.md for detailed setup instructions"
echo ""
echo "🚀 Happy chatting!"