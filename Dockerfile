FROM node:slim
WORKDIR /index.js
COPY . /index.js/
RUN npm install express jsonwebtoken fs body-parser
RUN npm i 
EXPOSE 3000
CMD node index.js