# Production Dockerfile for LiveKit Backend
FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
RUN npm run build

FROM node:20-alpine as runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.env ./
RUN npm ci --omit=dev
EXPOSE 3001
CMD ["node", "dist/server.js"]
