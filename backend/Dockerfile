# Stage 1: Build
FROM node:14-alpine AS builder

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY server.js ./

# Stage 2: Production
FROM node:14-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy only the necessary files from the builder stage
COPY --from=builder /usr/src/app .

# Remove dev dependencies to keep the image clean
RUN npm prune --production

# Expose the port
EXPOSE 5000

# Command to run the application
CMD ["node", "server.js"]
