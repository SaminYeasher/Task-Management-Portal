# Task Management Portal - Setup

## Requirements

- Node.js (a maintained LTS release) and npm
- Docker with the Compose plugin (only for the container setup)

## Option 1: Run Locally

1. Install dependencies for each part:

   ```sh
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

2. Start the backend (Terminal 1):

   ```sh
   cd backend
   npm run dev
   ```

3. Start the frontend (Terminal 2):

   ```sh
   cd frontend
   npm run dev
   ```

4. Open the URL printed by Vite (normally <http://localhost:5173>).
   The API runs at <http://localhost:3001>; check it at <http://localhost:3001/health>.

**Shortcut:** on Windows run `start.bat`; on macOS/Linux run `bash start.sh` from the repository root. Both start the backend and frontend together.

## Option 2: Docker Compose

From the repository root:

```sh
docker compose up --build
```

- Frontend: <http://localhost:5173>
- Backend: <http://localhost:3001>

Stop with `Ctrl+C`, or run `docker compose down` in another terminal. The database persists in `backend/tasks.db` on the host.

## Configuration (optional)

Defaults work out of the box. The backend does **not** read `.env` files; set variables in your shell (or Docker Compose) to override them.

| Variable | Default | Purpose |
| --- | --- | --- |
| `PORT` | `3001` | Backend port |
| `DATABASE_URL` | `./tasks.db` | SQLite file path (not a connection string) |
| `CORS_ORIGIN` | `http://localhost:5173` | Allowed browser origin |
| `VITE_API_URL` | `http://localhost:3001` | API URL used by the frontend (set in `frontend/.env`; restart Vite after changes) |

## Build the Frontend

```sh
cd frontend
npm run build      # output in frontend/dist
npm run preview    # preview the production build
```
