# Use the official Node.js image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port your Express.js app is running on (change if your app runs on a different port)
EXPOSE 3000

# Start your Node.js app using the start script defined in package.json
CMD ["npm", "run", "start:prod"]
