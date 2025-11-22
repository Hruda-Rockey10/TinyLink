# Multi-stage build for TinyLink

# Stage 1: Build React frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

# Stage 2: Setup backend and serve
FROM node:18-alpine
WORKDIR /app

# Copy backend files
COPY package*.json ./
COPY server.js ./
COPY db.js ./
COPY api/ ./api/
COPY migrations/ ./migrations/
COPY scripts/ ./scripts/

# Install production dependencies
RUN npm ci --only=production

# Copy built frontend from previous stage
COPY --from=frontend-build /app/client/dist ./client/dist

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/healthz', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start server
CMD ["node", "server.js"]
