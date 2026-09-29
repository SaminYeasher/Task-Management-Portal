@echo off
echo Starting Project & Task Management Portal...

start cmd /k "cd backend && npm start"
start cmd /k "cd frontend && npm run dev"

echo Both servers are starting!
echo Backend will be at http://localhost:3001
echo Frontend will be at http://localhost:5173
