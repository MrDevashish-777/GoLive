
# GoLive: Creator’s Stream Hub

>A full-stack, production-ready live streaming platform for creators and fans, powered by LiveKit, Node.js, React, Expo, and Docker.

---

## Table of Contents
- [Architecture Overview](#architecture-overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [How to Run (Development & Production)](#how-to-run-development--production)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Docker & Deployment](#docker--deployment)
- [Best Practices](#best-practices)
- [Contributing](#contributing)

---

## Architecture Overview

```
┌────────────┐     ┌──────────────┐     ┌──────────────┐
│  Frontend  │<--->│   Backend    │<--->│   Database   │
│ (React.js) │     │ (Node/TS)    │     │   (MySQL)    │
└────────────┘     └──────────────┘     └──────────────┘
         │                   │
         ▼                   ▼
┌────────────┐     ┌──────────────┐
│  Mobile    │     │  LiveKit     │
│ (Expo RN)  │<--->│  Media SFU   │
└────────────┘     └──────────────┘
```

## Technology Stack
- **Backend:** Node.js, Express, TypeScript, Socket.IO, LiveKit Server SDK
- **Frontend:** React.js, Material-UI, React Router, Redux Toolkit
- **Mobile:** Expo (React Native), Expo Router
- **Database:** MySQL (see `db/001_init_schema.sql`)
- **DevOps:** Docker, Docker Compose
- **Security:** JWT, Helmet, CORS, Rate Limiting
- **Logging:** Winston, Morgan

## Project Structure
```
GoLive/
   backend/      # Node.js/Express API for tokens, chat, rooms, gifts
   frontend/     # React.js web app (dashboard, stream, chat)
   app/          # Expo React Native app (mobile client)
   db/           # SQL schema migrations
   livekitDocker/# LiveKit server config
   scripts/      # Utility scripts
   src/          # Main backend (TypeScript)
   Dockerfile, docker-compose.yml, README.md, etc.
```

---

## How to Run (Development & Production)

### 1. Clone & Install
```sh
git clone <repo-url>
cd GoLive
# Install root dependencies (for monorepo scripts)
npm install
```

### 2. Environment Setup
- Copy `.env.example` to `.env` in backend and fill in LiveKit, DB, and CORS values.
- Example:
   ```env
   API_KEY=your_livekit_api_key
   API_SECRET=your_livekit_api_secret
   PORT=3001
   FRONTEND_ORIGIN=http://localhost:3000
   ```

### 3. Run Backend (TypeScript, Hot Reload)
```sh
cd backend
npm install
npm run dev
# or for TypeScript version:
cd ..

```

### 4. Run Frontend (React.js)
```sh
cd frontend
npm install
npm start
# App runs at http://localhost:3000
```

### 5. Run Mobile App (Expo)
```sh
cd app
npm install
npx expo start
# Scan QR with Expo Go app
```

### 6. Build & Run with Docker Compose (Recommended for Production)
```sh
docker-compose up --build
# Backend: http://localhost:3001
# LiveKit: http://localhost:7880
```

---

## API Endpoints

**Token & Health:**
- `GET /api/getToken?roomName=...&identity=...&isPublisher=...` — Get LiveKit JWT
- `GET /api/health` — Health check

**Rooms:**
- `POST /api/rooms` — Create a room
- `POST /api/rooms/:roomId/end` — End a room
- `GET /api/rooms/live` — List live rooms

**Messages:**
- `POST /api/messages` — Send a chat message
- `GET /api/messages/:roomId` — Get messages for a room

**Gifts:**
- `POST /api/gifts` — Send a gift

---

## Database Schema (MySQL)

See [`db/001_init_schema.sql`](db/001_init_schema.sql) for full details. Key tables:

- `users` — User accounts
- `streams` — Live streams
- `chat_messages` — Chat per stream
- `user_wallets` — Token balances
- `transactions` — Token purchases
- `donations` — Gifts/donations
- `host_invites` — Stream invites

---

## Docker & Deployment

- **Production:** Use `docker-compose up --build` for full stack (backend, LiveKit, frontend)
- **Backend:** See `backend/Dockerfile` (Node.js, TypeScript build, env injection)
- **Frontend:** See `frontend/Dockerfile` (React build)
- **LiveKit:** Uses official image, configured via `livekitDocker/livekit.yaml`
- **Ports:**
   - Backend: `3001`
   - Frontend: `3000`
   - LiveKit: `7880`, `7881`
- **Env:** Use `.env` files for secrets and config
- **Cloud:** Ready for AWS/GCP/Heroku (just set env vars and expose ports)

---

## Best Practices

- **Security:**
   - Use HTTPS in production
   - Store secrets in environment variables
   - Enable CORS only for trusted origins
   - Use strong JWT secrets and short TTLs
- **Code Quality:**
   - TypeScript strict mode (backend)
   - Lint with ESLint
   - Centralized error handling and logging
- **Scalability:**
   - Use Docker for reproducible builds
   - Stateless backend (sessions via JWT)
   - Socket.IO for real-time chat/gifts
- **Testing:**
   - Add unit/integration tests for controllers and utils
   - Use Postman or similar for API testing
- **Database:**
   - Use migrations for schema changes
   - Never commit secrets or production data

---

## Contributing

1. Fork the repo & clone locally
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes with clear messages
4. Push and open a Pull Request

---

## Credits

- Built with [LiveKit](https://livekit.io/), [React](https://react.dev/), [Expo](https://expo.dev/), [Docker](https://www.docker.com/), and ❤️ by the GoLive team.
## License
MIT
# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
