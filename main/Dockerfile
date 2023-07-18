FROM node:18-alpine

RUN apk add --update sqlite

RUN mkdir -p /opt/app
WORKDIR /opt/app

COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --omit=dev

ENV NODE_ENV=production
CMD ["node", "server.js"]
