#!/bin/bash

echo "🚀 Starting React project setup..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
  echo "❌ Node.js is not installed. Please install it before continuing."
  exit 1
fi

# Make scripts and husky hooks executable
echo "🔐 Ensuring scripts and hooks are executable..."
chmod +x scripts/*.mjs 2>/dev/null
chmod +x .husky/* 2>/dev/null

# Create base structure
echo "📂 Creating base structure..."
node scripts/createStructure.js

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Detect user's shell and config file
SHELL_NAME=$(basename "$SHELL")
CONFIG_FILE=""

case "$SHELL_NAME" in
  bash) CONFIG_FILE="$HOME/.bashrc" ;;
  zsh) CONFIG_FILE="$HOME/.zshrc" ;;
  fish) CONFIG_FILE="$HOME/.config/fish/config.fish" ;;
  *) CONFIG_FILE="$HOME/.bashrc"
     echo "⚠️ Unknown shell: $SHELL_NAME. Defaulting to .bashrc" ;;
esac

# Add alias if not already present
if ! grep -Fxq "alias tidy='node scripts/alias.js'" "$CONFIG_FILE"; then
  echo "🔗 Adding alias to $CONFIG_FILE"
  echo "alias tidy='node scripts/alias.js'" >> "$CONFIG_FILE"
  source "$CONFIG_FILE"
fi

# Run lint and format
echo "🧹 Running lint and format..."
npm run lint:fix && npm run format

echo "✅ React project successfully initialized 🎉"
echo "📦 All dependencies installed"
echo "🔧 ESLint, Prettier, Husky, and Commitizen configured"
echo "🚀 To start the development server, run: npm run dev"
echo "✨ Tidy alias is now available – just type: tidy"
echo "🌀 You may need to restart your terminal or run: source $CONFIG_FILE"
