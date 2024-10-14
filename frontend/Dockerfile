# Use the official Node.js image to build the frontend
FROM node:14 AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files

COPY src/ ./src/
COPY public/ ./public/

# Build the application
RUN npm run build

# Use a lightweight server to serve the build
FROM nginx:alpine

# Copy the build files to the NGINX server
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Command to run NGINX
CMD ["nginx", "-g", "daemon off;"]
