# Stage 1: Build Frontend
FROM node:14 AS frontend-build

# Set the working directory
WORKDIR /usr/src/app/frontend

# Copy frontend package.json and package-lock.json
COPY frontend/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy frontend application files
COPY frontend/src ./src
COPY frontend/public ./public

# Build the frontend application
RUN npm run build

# Stage 2: Build Backend
FROM node:14 AS backend-build

# Set the working directory
WORKDIR /usr/src/app/backend

# Copy backend package.json and package-lock.json
COPY backend/package*.json ./

# Install backend dependencies
RUN npm install

# Copy backend application files
COPY backend/server.js ./

# Stage 3: Production
FROM node:14-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy frontend build files to NGINX
COPY --from=frontend-build /usr/src/app/frontend/build /usr/share/nginx/html

# Copy backend files
COPY --from=backend-build /usr/src/app/backend .

# Expose ports
EXPOSE 80 5000

# Start both backend and NGINX for frontend
CMD ["sh", "-c", "node server.js & nginx -g 'daemon off;'"]
