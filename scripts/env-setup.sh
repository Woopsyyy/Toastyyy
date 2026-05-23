#!/bin/sh

# Toastyyy Shell Command Shortcuts
# This wrapper function enables running "npm test:dev" and "npm push dev" directly 
# without needing the "run" keyword, resolving NPM's strict command limits.

npm() {
  if [ "$1" = "test:dev" ]; then
    command npm run test:dev "${@:2}"
  elif [ "$1" = "push:dev" ]; then
    command npm run push:dev "${@:2}"
  elif [ "$1" = "push" ] && [ "$2" = "dev" ]; then
    command npm run push:dev "${@:3}"
  else
    command npm "$@"
  fi
}

echo "🍞 \x1b[32mToastyyy shell shortcuts activated successfully!\x1b[0m"
echo "   You can now run: \x1b[36mnpm test:dev\x1b[0m and \x1b[36mnpm push dev\x1b[0m"
