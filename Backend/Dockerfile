FROM node:20-alpine3.21 AS base

WORKDIR /app

# Builder stage

FROM base AS builder

COPY package*.json .
COPY tsconfig.json .

RUN npm install
COPY . .
RUN npm run build

CMD [ "node dist/index.js" ]
# production stage

FROM base AS production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/tsconfig.json ./

RUN npm install --omit=dev

EXPOSE 5000

CMD [ "node dist/index.js" ]
 
