
FROM node:16.3.0-alpine

WORKDIR /frontend

COPY package*.json ./
RUN npm install 

COPY . .
CMD ["npm", "start"]
