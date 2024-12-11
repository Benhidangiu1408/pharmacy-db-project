#!/bin/bash

# Function to check and kill a process if it's running "ps aux | grep "node src/restServer.js"
kill_if_running() {
  process_name=$1
  pid=$(pgrep -f "$process_name")
  if [ -n "$pid" ]; then
    echo "Killing existing process: $process_name (PID: $pid)"
    pkill -f "$process_name"
  fi
}

# Navigate to the backend directory
cd backend || exit

# Kill existing server.js if running
kill_if_running "node src/server.js"

# Start server.js in the background
echo "Starting server.js..."
node src/server.js &

# Kill existing restServer.js if running
kill_if_running "node src/restServer.js"

# Start restServer.js in the background
echo "Starting restServer.js..."
node src/restServer.js &

# Navigate to the frontend directory
cd ../frontend || exit

# Start the frontend development server
echo "Starting frontend development server..."
npm run dev

# Keep the script running (optional, see note below)
wait