FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Expose the port the app runs on
EXPOSE 5173

# Define the command to run the app
CMD ["npm", "run","dev"]