FROM node:latest

# Add a /challenge volume
VOLUME ["/challenge"]

WORKDIR /challenge

RUN npm install

EXPOSE 3000
CMD ["npm", "start"]