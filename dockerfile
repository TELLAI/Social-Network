FROM node
WORKDIR /app
COPY . app
RUN npm init -y
RUN npm i express nodemon dotenv