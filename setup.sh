#!/bin/bash

cp .env.example .env

echo "Stopping current containers..."
docker stop $(docker ps -a -q)
docker-compose rm -fs mysql front back

docker-compose up --build -d

sleep 5

echo registration is ready on http://localhost:5173


