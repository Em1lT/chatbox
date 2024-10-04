FROM node:18 AS development

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install 

COPY . .

RUN yarn build

EXPOSE 3000

cmd ["node", "dist/main.js"]
