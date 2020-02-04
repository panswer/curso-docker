FROM debian:jessie
RUN apt-get update && apt-get install -y \
    git \
    node \
    npm \
    nano
COPY abc.txt /src/abc.txt