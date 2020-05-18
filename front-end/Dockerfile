FROM node:latest

WORKDIR ./

COPY package*.json ./

RUN npm install
RUN npm install react-scripts@3.4.1 -g
COPY . .

RUN npm run build
RUN npm install -g serve
EXPOSE 3000



CMD ["serve", "-s", "build"]