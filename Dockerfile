# build environment
FROM node:18.12-alpine3.17 as builder
LABEL maintainer="support126@electromech.info"
LABEL description="This is the MyLOFT article notifier Service."
ARG CI_JOB_TOKEN=RUqwGnkD2PzPoL8QzJtR
ARG NODE_LOGGER_PROJECT_ID=23016092
ARG NODE_LOGGER_PACKAGE_VERSION=latest
ENV NODE_ENV $NODE_ENV 

RUN mkdir -p /usr/src/app  && \
  chown -R node:node /usr/src/app
WORKDIR /usr/src/app
COPY package*.json  /usr/src/app/package.json


ENV NODE_ENV $NODE_ENV 
RUN npm config set @eclat-eng:registry https://gitlab.com/api/v4/projects/${NODE_LOGGER_PROJECT_ID}/packages/npm/ && \
    npm config set '//gitlab.com/api/v4/projects/${NODE_LOGGER_PROJECT_ID}/packages/npm/:_authToken' ${CI_JOB_TOKEN} && \
    npm i @eclat-eng/myloft-nodejs-logger@${NODE_LOGGER_PACKAGE_VERSION}
RUN npm install
USER node


COPY . /usr/src/app
RUN npm run build

FROM node:18.12-alpine3.17 
COPY --from=builder /usr/src/app /usr/src/app
COPY --chown=node:node . .
WORKDIR /usr/src/app
USER node

EXPOSE 3000
CMD [ "node", "dist/main.js" ]
