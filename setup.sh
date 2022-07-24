#!/bin/bash

cp .env.example .env

echo "Stopping current containers..."
docker stop $(docker ps -a -q)
docker-compose rm -fs mysql front back

docker-compose up --build -d


if ! yarn -v /etc/hosts; then
  echo 'sudo is required only to install yarn :)'
  sudo apt update
  sudo apt install yarn -y
  sudo echo "127.0.0.1 mysql" >> /etc/hosts;
fi

cd packages/registration-back
yarn run migration:up

echo registration is ready on http://localhost:5173


