net:
	docker network create ito_ocashi_link

build-frontend:
	docker-compose -f ../Ito-ocashi-review/docker-compose.yml build

up-frontend:
	docker-compose -f ../Ito-ocashi-review/docker-compose.yml up

build-backend:
	docker-compose -f ./docker-compose.yml build

up-backend:
	docker-compose -f ./docker-compose.yml up

build:
	docker-compose -f ../Ito-ocashi-review/docker-compose.yml build && \
	docker-compose -f ./docker-compose.yml build

up:
	docker-compose -f ../Ito-ocashi-review/docker-compose.yml up && \
	docker-compose -f ./docker-compose.yml up