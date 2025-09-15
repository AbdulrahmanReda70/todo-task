.PHONY: help up down build logs shell migrate seed fresh install test clean

# Default target
help:
	@echo "Available commands:"
	@echo "  make up        - Build and start all containers"
	@echo "  make down      - Stop and remove containers"
	@echo "  make build     - Build containers without starting"
	@echo "  make logs      - View application logs"
	@echo "  make shell     - Access app container shell"
	@echo "  make migrate   - Run database migrations"
	@echo "  make seed      - Run database seeders"
	@echo "  make fresh     - Fresh migration with seeding"
	@echo "  make install   - Install/update dependencies"
	@echo "  make test      - Run tests"
	@echo "  make clean     - Clean up containers and volumes"

# Build and start containers
up:
	docker-compose up --build -d

# Stop and remove containers
down:
	docker-compose down

# Build containers without starting
build:
	docker-compose build

# View application logs
logs:
	docker-compose logs -f app

# Access app container shell
shell:
	docker-compose exec app bash

# Run database migrations
migrate:
	docker-compose exec app php artisan migrate

# Run database seeders
seed:
	docker-compose exec app php artisan db:seed

# Fresh migration with seeding
fresh:
	docker-compose exec app php artisan migrate:fresh --seed

# Install/update dependencies
install:
	docker-compose exec app composer install
	docker-compose exec app npm install

# Run tests
test:
	docker-compose exec app php artisan test

# Clean up containers and volumes
clean:
	docker-compose down -v --remove-orphans
	docker system prune -f
