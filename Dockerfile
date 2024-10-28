FROM node:16-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/next.config.js ./
COPY --from=builder /usr/src/app/next-i18next.config.js ./
COPY --from=builder /usr/src/app/next-env.d.ts ./
COPY --from=builder /usr/src/app/*.json ./

EXPOSE 3000

CMD ["npm", "run", "start"]
