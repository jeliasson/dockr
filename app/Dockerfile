FROM node:8 as builder
WORKDIR /dockr/app

# Environment variable
ENV FORCE=true

# Copy
COPY ./bin ./bin
COPY ./scripts ./scripts
COPY ./src ./src
COPY ./templates ./templates
COPY ./tests ./tests
COPY ./banner.txt .
COPY ./dockr.js .
COPY ./package.json .

# Install dependencies
RUN apt-get update && apt-get -f install sudo

# Setup dockr
RUN bash ./scripts/setup.sh --force

ENTRYPOINT [ "bash", "dockr" ]
