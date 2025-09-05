# LiveKit Backend (Node.js + Express + TypeScript)

A secure, production-ready backend for a LiveKit-powered live streaming app.

## Features
- Secure JWT token generation for LiveKit
- Publisher/viewer permissions
- Rate limiting, CORS, helmet, centralized error handling
- Health check endpoint
- Logging with winston & morgan
- Docker & docker-compose for deployment
- TypeScript strict mode

## Project Structure
```
src/
   config/         # env loader, validation
   controllers/    # token & health controllers
   middlewares/    # error handling, rate limiting
   routes/         # API endpoints
   utils/          # token generator, logger
   server.ts       # entrypoint
```

## Setup

1. **Clone & Install**
```sh
git clone <repo-url>
cd GoLive
npm install
```



3. **Run in Development**
```sh
npm run dev
```

4. **Build & Start (Production)**
```sh
npm run build
npm start
```

5. **Docker Compose (Backend + LiveKit)**
```sh
docker-compose up --build
```

## Endpoints
- `GET /api/getToken?roomName=...&identity=...&isPublisher=...` — Get LiveKit JWT
- `GET /api/health` — Health check

## Deployment
- Ready for AWS/GCP/Heroku (see Dockerfile & docker-compose.yml)
- Expose port 3001 (backend) and 7880/7881 (LiveKit)
- Use HTTPS in production

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
