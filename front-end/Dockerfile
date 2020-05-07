FROM node:latest

WORKDIR ./

ENV PATH /node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install
RUN npm install react-scripts@3.4.1 -g


RUN npm install -g serve
EXPOSE 3001

COPY . .

CMD [ "npm", "start"]