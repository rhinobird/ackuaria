FROM zevarito/ubuntu-base:latest

MAINTAINER Alvaro Gil

ARG BRANCH

WORKDIR /opt/ackuaria

ADD . .
RUN npm install
