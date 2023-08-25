# Use the official Node.js image as a base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application source code
COPY . .

# Expose the port your app is running on (if necessary)
EXPOSE 5001

# Define the command to run your application
CMD ["npm", "run" ,"dev"]