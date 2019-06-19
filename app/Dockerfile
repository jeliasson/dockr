FROM node:8 as builder
WORKDIR /app

# Copy
COPY ./banner.txt .
COPY ./dockr.js .
COPY ./package.json .

COPY ./bin ./bin
COPY ./scripts ./scripts
COPY ./src ./src
COPY ./tests ./tests

# Make sure we have sudo for setup script
RUN apt-get update
RUN apt-get install sudo

RUN bash /app/scripts/setup.sh --force

ENTRYPOINT [ "bash", "dockr" ]
