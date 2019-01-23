build:
	@echo "[building project]"
	npm run-script build
	@echo "[deploying to docker]"
	sudo docker build -t "ccclient:latest" .
	sudo docker run --name ccclient -d -p:80:80 ccclient:latest
	sudo docker stop ccclient
	sudo docker commit -m "adding ccclient" -a "Rodrigo Debian" ccclient rodocker/ccclient:latest
	sudo docker login
	sudo docker push rodocker/ccclient
	sudo docker rm ccclient
	sudo docker rmi rodocker/ccclient
	sudo docker rmi ccclient
	rm -rf build/
