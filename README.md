# MERN Task Manager

This workspace contains a MERN (MongoDB, Express, React, Node) Task Manager app with JWT authentication, Tailwind CSS, drag-and-drop reorder, and dark mode.

Folders:
- `backend/` - Express API
- `frontend/` - Vite + React app

Requirements:
- Docker & docker-compose (recommended) OR Node.js and npm to run services locally.

Quick start with Docker:
1. Copy `.env.example` to `.env` in `backend/` and `frontend/` if you want local dev.
2. Run: docker-compose up --build
3. Backend: http://localhost:5000
4. Frontend: http://localhost:5173

Local run without Docker:
Backend:
- cd backend
- npm install
- copy `.env.example` to `.env` and set values
- npm run dev

Frontend:
- cd frontend
- npm install
- copy `.env.example` to `.env` and set VITE_API_URL if needed
- npm run dev

Windows PowerShell example (local):

```powershell
cd .\backend; npm install; cp .env.example .env; npm run dev
# in a separate shell
cd .\frontend; npm install; cp .env.example .env; npm run dev
```

Notes:
- API endpoints are under `/api/auth` and `/api/tasks`.
- JWT token is stored in localStorage.
- For production, set a secure `JWT_SECRET` and configure origins for CORS.

Quick env references:

- backend/.env.example
	- PORT=5000
	- MONGO_URI (e.g. mongodb://localhost:27017/taskdb)
	- JWT_SECRET

- frontend/.env.example
	- VITE_API_URL (e.g. http://localhost:5000/api)

What's included:
- Complete Express API with JWT auth, bcrypt password hashing, and task CRUD + reorder endpoint.
- Vite + React frontend with Tailwind CSS, contexts for auth/tasks, drag-and-drop using react-beautiful-dnd, and dark mode.

If you'd like, I can run npm install and start the dev servers here (if you want me to run commands in your terminal). 
