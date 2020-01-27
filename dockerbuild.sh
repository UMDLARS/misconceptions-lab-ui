#! /bin/bash
#.
# Cleaning up shop here
# We are removing all docker containers here.
docker kill $(docker ps -q)
docker rm $(docker ps -a -q)
docker network rm $(docker ps -a -q)

# Removing everything else docker wise
docker system prune -f

# Building the webapp
docker build -t umdlars/webtemplate .
docker run -p 44477:4200 umdlars/webtemplate

