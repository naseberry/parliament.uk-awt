FROM node:7-alpine

# Environment variables
ENV WORK_DIR /app
ENV DOMAIN https://www.example.com
ENV SAUCE_USERNAME unknown
ENV SAUCE_ACCESS_KEY unknown

# Install system dependencies
RUN apk --no-cache add \
    curl \
    make

# Set the working DIR.
WORKDIR $WORK_DIR

# Install application dependencies
COPY package.json $WORK_DIR
RUN npm i

# Copy the application onto our image
COPY . $WORK_DIR
