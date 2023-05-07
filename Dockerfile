FROM node:19-alpine3.16
RUN npm install -g typescript
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN tsc
CMD ["npm", "start"]
