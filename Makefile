.PHONY: help dev-up dev-down dev-logs dev-rebuild prod-up prod-down prod-logs prod-rebuild clean reset

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-20s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

dev-up: ## Start development environment
	docker-compose up -d

dev-down: ## Stop development environment
	docker-compose down

dev-logs: ## View development logs
	docker-compose logs -f

dev-rebuild: ## Rebuild and start development environment
	docker-compose up -d --build

dev-shell: ## Access app container shell
	docker exec -it mobile_ganj_app sh

dev-mysql: ## Access MySQL shell
	docker exec -it mobile_ganj_mysql mysql -u mobile_ganj_user -pmobile_ganj_pass mobile_ganj

prod-up: ## Start production environment
	docker-compose -f docker-compose.prod.yml up -d --build

prod-down: ## Stop production environment
	docker-compose -f docker-compose.prod.yml down

prod-logs: ## View production logs
	docker-compose -f docker-compose.prod.yml logs -f

prod-rebuild: ## Rebuild and restart production environment
	docker-compose -f docker-compose.prod.yml up -d --build

clean: ## Remove all containers and images
	docker-compose down --rmi all -v

reset: ## Reset database (removes all data)
	docker-compose down -v
	docker-compose up -d

ps: ## Show running containers
	docker-compose ps

restart: ## Restart all services
	docker-compose restart

restart-app: ## Restart only the app service
	docker-compose restart app

restart-mysql: ## Restart only the MySQL service
	docker-compose restart mysql
