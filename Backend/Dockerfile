FROM node:18-alpine

# What is Dockerfile?
# Dockerfile describes how to build Docker images, 
# while docker-compose is used to run Docker containers.

# CD into directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY package.json .

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000

CMD ["npm", "start"]