#!/bin/bash

sudo docker-compose run -p 3000:3000 --rm app sh -c 'npm run dev'

