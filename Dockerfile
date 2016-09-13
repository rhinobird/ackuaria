FROM zevarito/ubuntu-base:latest

MAINTAINER Alvaro Gil

ARG BRANCH

WORKDIR /opt/ackuaria

RUN curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
RUN apt-get install -y nodejs

ADD . .
RUN npm install
