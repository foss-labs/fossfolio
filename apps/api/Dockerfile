FROM node

RUN npm install -g pnpm

COPY package.json package.json
COPY .env .env
COPY src src

RUN pnpm install
RUN pnpm run start

ENTRYPOINT ["pnpm", "start:prod"]
