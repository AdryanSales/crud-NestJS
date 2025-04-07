FROM node:18.14.1
WORKDIR /api
COPY . .
COPY ./.env.production ./.env

RUN npm install --quiet --no-option --no-fund --loglevel=error
RUN npm build

CMD ["npm", "run", "start"]