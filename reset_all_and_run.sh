#!/bin/bash

sudo docker-compose run --rm app sh -c 'npm run clear-upload && rm database/data.sqlite && npm run db:migrate:latest'

sudo docker-compose down

sudo docker-compose up -d
