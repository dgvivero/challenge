FROM node:latest

RUN mkdir /challenge

WORKDIR /challenge
COPY package.json /challenge

RUN npm install

COPY . /challenge

EXPOSE 3000
CMD ["npm", "start"]