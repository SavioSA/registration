#!/bin/bash

cp .env.example .env

docker-compose up --build -d

cd packages/registration-back

if ! yarn -v /etc/hosts; then
  echo 'sudo is required only to install yarn :)'
  sudo apt update
  sudo apt install yarn -y
  sudo echo "127.0.0.1 mysql" >> /etc/hosts;
fi

yarn run migration:up

echo registration is ready on http://localhost:5173


