# Select the base Node.js image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire source code to the working directory
COPY . .

# Build the Vue.js application for production
RUN npm run build

# Select the base Nginx image to serve the application
FROM nginx:stable-alpine

# Copy the built Vue.js files to the Nginx directory
COPY --from=0 /app/dist /usr/share/nginx/html

# Expose port 80 to access the application
EXPOSE 80

# Start the Nginx server when the container is run
CMD ["nginx", "-g", "daemon off;"]