FROM node:20.18.0-alpine

WORKDIR /app

COPY package.json ./

RUN npm install -g pnpm

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "sh", "-c", "npm run dev" ]

