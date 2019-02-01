build:
	@echo "[building project]"
	npm run-script build
	@echo "[deploying to docker]"
	docker build -t "ccclient:latest" .
	docker run --name ccclient -d -p:80:80 ccclient:latest
	docker stop ccclient
	docker commit -m "adding ccclient" -a "Rodrigo Debian" ccclient rodocker/ccclient:latest
	docker login
	docker push rodocker/ccclient
	docker rm ccclient
	docker rmi rodocker/ccclient
	docker rmi ccclient
	rm -rf build/
