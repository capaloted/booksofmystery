#!/bin/bash

# Books of Mystery - Start Server and Open Website
echo "🚀 Starting Books of Mystery server..."

# Start the server in the background
npm start &
SERVER_PID=$!

# Wait a moment for the server to start
sleep 2

# Open the website in the default browser
echo "🌐 Opening website in browser..."
open http://localhost:3000

echo "✅ Server started! Press Ctrl+C to stop the server."
echo "📖 Website should open automatically in your browser."

# Wait for user to stop the server
wait $SERVER_PID

