net:
	docker network create ito_ocashi_link

build-frontend:
	docker-compose -f ../ior-front/docker-compose.yml build

up-frontend:
	docker-compose -f ../ior-front/docker-compose.yml up

build-backend:
	docker-compose -f ./docker-compose.yml build

up-backend:
	docker-compose -f ./docker-compose.yml up

build:
	docker-compose -f ../ior-front/docker-compose.yml build && \
	docker-compose -f ./docker-compose.yml build

up:
	docker-compose -f ../ior-front/docker-compose.yml up -d && \
	docker-compose -f ./docker-compose.yml up -d

stop-frontend:
	docker-compose -f ../ior-front/docker-compose.yml stop

down-frontend:
	docker-compose -f ../ior-front/docker-compose.yml down

stop-backend:
	docker-compose -f ./docker-compose.yml stop

down-backend:
	docker-compose -f ./docker-compose.yml down

stop:
	docker-compose -f ../ior-front/docker-compose.yml stop && \
	docker-compose -f ./docker-compose.yml stop

down:
	docker-compose -f ../ior-front/docker-compose.yml down && \
	docker-compose -f ./docker-compose.yml down
