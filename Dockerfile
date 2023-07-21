# production build stage

FROM node:17-alpine 

ARG RAILWAY_ENVIRONMENT
ENV RAILWAY_ENVIRONMENT=$RAILWAY_ENVIRONMENT

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY . ./

EXPOSE 5000

USER node

CMD [ "npm","start"]

