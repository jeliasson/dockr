FROM node:8 as builder
WORKDIR /app

# Environment variable
ENV FORCE=true

# Copy
COPY ./banner.txt .
COPY ./dockr.js .
COPY ./package.json .

COPY ./bin ./bin
COPY ./scripts ./scripts
COPY ./src ./src
COPY ./templates ./templates
COPY ./tests ./tests

# Install dependencies
RUN apt-get update && apt-get -f install sudo

# Setup dockr
RUN bash /app/scripts/setup.sh --force

ENTRYPOINT [ "bash", "dockr" ]
