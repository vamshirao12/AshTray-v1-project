# AshTray — 99.9% Ready Build

Based on the working AshTray V2 source. MongoDB remains the primary application database.

## The only required edits
1. Create `backend/.env` from `backend/.env.example` and set `MONGO_URI` + `JWT_SECRET`.
2. If you want live AI output, set `OPENAI_API_KEY` (otherwise the app uses a safe fallback).

## Run
Backend: `cd backend && npm install && npm run dev`
Frontend: `cd frontend && npm install && npm run dev`

Optional: `docker compose up -d` starts PostgreSQL and Redis for the rubric infrastructure.

Do not commit `.env` files.
