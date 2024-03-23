FROM node:21-alpine

RUN npm install -g nodemon


WORKDIR /app

COPY . .

RUN npm install

CMD ["nodemon", "-L", "app.js"]

