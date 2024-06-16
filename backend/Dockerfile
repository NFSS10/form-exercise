FROM node:20-alpine

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

ENV PORT=5000

EXPOSE ${PORT}

CMD ["yarn", "start"]
