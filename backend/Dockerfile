FROM node:14-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY server.js ./

FROM node:14-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app ./

# Remove dev dependencies to keep the image clean
RUN npm prune --production

# Expose the port
EXPOSE 5000

# Command to run the application
CMD ["node", "server.js"]
