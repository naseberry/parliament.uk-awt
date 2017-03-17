FROM node:7.7.3-alpine
MAINTAINER Steve Wade <steven@stevenwade.co.uk>

WORKDIR /app
COPY . /app

RUN npm install
RUN apk --update add gcc make g++ zlib-dev

CMD [ "make", "sauce" ]