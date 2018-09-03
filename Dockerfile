FROM node:10.7.0

RUN mkdir /app
COPY . /app
WORKDIR /app

RUN npm ci
RUN npm run build
RUN mv ./build /public
