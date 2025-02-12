FROM node:22-alpine

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm install react-router-dom
RUN npm install axios
RUN npm install semantic-ui-react semantic-ui-css

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
