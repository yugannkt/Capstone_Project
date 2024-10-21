FROM node:14 AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY .env ./
COPY src/ ./src/
COPY public/ ./public/

RUN npm run build

FROM nginx:alpine

# Copy the build files to the NGINX server
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Command to run NGINX
CMD ["nginx", "-g", "daemon off;"]
