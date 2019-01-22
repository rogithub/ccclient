#!/bin/bash
docker build -t "ccclient:latest" .
docker run --name ccclient -d -p:80:80 ccclient:latest
docker commit -m "adding ccclient" -a "Rodrigo Debian" ccclient rodocker/ccclient:latest
docker login
docker push rodocker/ccclient
