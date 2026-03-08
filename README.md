# LS Web

Full-stack web application for **Leśna Szkółka**:
- Frontend: Next.js (App Router) + React + Tailwind CSS
- Backend: FastAPI + SQLAlchemy
- Database: PostgreSQL
- Auth: Azure AD / NextAuth

## Table of Contents
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Quick Start (Docker, recommended)](#quick-start-docker-recommended)
- [Local Development (without Docker)](#local-development-without-docker)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [API Overview](#api-overview)
- [Project Structure](#project-structure)
- [Deployment Notes](#deployment-notes)
- [README Best Practices](#readme-best-practices)
- [Clean Architecture References](#clean-architecture-references)

## Project Overview
This repository contains:
- A public-facing website
- An admin/dashboard area for content management
- A Python API used by the frontend and dashboard

Main managed domains/entities include:
- Teams (`druzyny`)
- Trips/events (`wyjazdy`)
- Leadership (`komenda`)
- Audit committee (`komisja rewizyjna`)

## Tech Stack

### Frontend
- [Next.js](https://nextjs.org/docs)
- [React](https://react.dev/learn)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [NextAuth.js](https://next-auth.js.org/getting-started/introduction)
- [Leaflet](https://leafletjs.com/reference.html)

### Backend
- [FastAPI](https://fastapi.tiangolo.com/)
- [SQLAlchemy](https://docs.sqlalchemy.org/)
- [Pydantic](https://docs.pydantic.dev/latest/)
- [PostgreSQL](https://www.postgresql.org/docs/)

### Infrastructure / Ops
- [Docker](https://docs.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [NGINX](https://nginx.org/en/docs/)
- [Microsoft Entra ID (Azure AD)](https://learn.microsoft.com/en-us/entra/identity/)
- [Azure Communication Services Email](https://learn.microsoft.com/en-us/azure/communication-services/quickstarts/email/send-email)

## Architecture
The backend follows a layered structure aligned with clean architecture principles:
- `domain/` for core models and interfaces
- `usecases/` for business logic
- `repositories/` for persistence abstractions/implementations
- `infrastructure/` for DB and auth integrations
- `middleware/` for auth middleware

## Prerequisites
- Node.js `20+`
- npm `9+`
- Python `3.10+`
- Docker + Docker Compose (for containerized local run)

## Quick Start (Docker, recommended)
1. Create env files:
```bash
cp .env.local.example .env.local   # if example file exists
cp backend/.env.example backend/.env # if example file exists
```
If example files do not exist, create `.env.local` and `backend/.env` manually (see [Environment Variables](#environment-variables)).

2. Start full local stack:
```bash
docker compose -f docker-compose.local.yml up -d --build
```

3. Open services:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8001`
- PostgreSQL: `localhost:5432`

4. Stop services:
```bash
docker compose -f docker-compose.local.yml down
```

## Local Development (without Docker)

### Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Linux/macOS
# .venv\Scripts\activate   # Windows
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8001 --reload
```

### Frontend
```bash
cd ..
npm install
npm run dev
```

## Environment Variables

### Frontend (`.env.local`)
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=change_me

AZURE_AD_CLIENT_ID=...
AZURE_AD_CLIENT_SECRET=...
AZURE_AD_TENANT_ID=...

NEXT_PUBLIC_API_URL=http://localhost:8001
API_BASE_URL=http://localhost:8001

AZURE_COMMUNICATION_CONNECTION_STRING=...
BIWAK_NOTIFICATION_EMAIL=you@example.com
```

### Backend (`backend/.env`)
```env
DATABASE_URL=postgresql://ino_user:ino_password@localhost:5432/ino_db
AZURE_AD_CLIENT_ID=...
AZURE_AD_CLIENT_SECRET=...
AZURE_AD_TENANT_ID=...
JWT_SECRET_KEY=change_me
```

## Available Scripts
From repository root:
- `npm run dev` - start Next.js development server
- `npm run build` - build production frontend
- `npm run start` - run production frontend server
- `npm run lint` - run Next.js/ESLint checks

## API Overview
Main backend routes:
- `GET /druzyny`, `POST /druzyny`, `PUT /druzyny/{id}`, `DELETE /druzyny/{id}`
- `GET /wyjazdy/upcoming`, `POST /wyjazdy`, `PUT /wyjazdy/{id}`, `DELETE /wyjazdy/{id}`
- `GET /komenda`, `POST /komenda`, `PUT /komenda/{id}`, `DELETE /komenda/{id}`
- `GET /komisja-rewizyjna`, `POST /komisja-rewizyjna`, `PUT /komisja-rewizyjna/{id}`, `DELETE /komisja-rewizyjna/{id}`
- `POST /auth/azure-login`, `GET /auth/me`

Most write operations require authenticated user context.

## Project Structure
```text
ls-web/
├── app/                 # Next.js app routes and API routes
├── components/          # Reusable React UI components
├── lib/                 # Shared frontend utilities
├── backend/             # FastAPI application
│   ├── domain/
│   ├── usecases/
│   ├── repositories/
│   ├── infrastructure/
│   └── middleware/
├── docker-compose.local.yml
├── docker-compose.yml
└── README.md
```

## Deployment Notes
- Local multi-service setup uses `docker-compose.local.yml`.
- Reverse-proxy deployment setup is defined in `docker-compose.yml` and `nginx.conf`.
- For production releases, pin image tags and keep secrets outside repository files.

## README Best Practices
Useful references used for this README structure:
- GitHub Docs: [About READMEs](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes)
- Make a README: [makeareadme.com](https://www.makeareadme.com/)

## Clean Architecture References
- Robert C. Martin: [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2011/11/22/Clean-Architecture.html)
- Practical example repo: [ardalis/CleanArchitecture](https://github.com/ardalis/CleanArchitecture)
