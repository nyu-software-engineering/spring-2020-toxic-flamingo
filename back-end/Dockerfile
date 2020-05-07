FROM node:latest

WORKDIR ./

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 7000

CMD [ "node", "app.js" ]