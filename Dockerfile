FROM node:10.19.0
WORKDIR /usr/app
RUN npm i -g nodemon
RUN npm install grpc --verbose
COPY ./package.json .
RUN npm install
COPY . .
EXPOSE 8002
CMD npm start