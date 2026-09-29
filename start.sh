
echo "Starting Project & Task Management Portal..."

cd backend
npm start &
BACKEND_PID=$!
cd ..


cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo "Both servers are starting!"
echo "Backend will be at http://localhost:3001"
echo "Frontend will be at http://localhost:5173"
echo "Press Ctrl+C to stop both servers."

trap "kill $BACKEND_PID $FRONTEND_PID" SIGINT
wait
