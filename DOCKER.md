# Docker Setup Guide

This project includes Docker support for both development and production environments.

## Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+

## Files Overview

- `Dockerfile` - Production-optimized multi-stage build
- `Dockerfile.dev` - Development dockerfile with hot reload
- `docker-compose.yml` - Development environment setup
- `docker-compose.prod.yml` - Production environment setup
- `.dockerignore` - Files to exclude from Docker builds

## Development

### Start the application

```bash
docker-compose up -d
```

This will:
- Start MySQL database on port 3306
- Start the NestJS application on port 3000
- Enable hot reload (changes to source code will automatically reload)

### View logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f app
docker-compose logs -f mysql
```

### Stop the application

```bash
docker-compose down
```

### Rebuild after dependency changes

```bash
docker-compose up -d --build
```

### Access the container shell

```bash
docker exec -it mobile_ganj_app sh
```

### Access MySQL

```bash
docker exec -it mobile_ganj_mysql mysql -u mobile_ganj_user -p mobile_ganj
# Password: mobile_ganj_pass
```

## Production

### Start production environment

```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

### Stop production environment

```bash
docker-compose -f docker-compose.prod.yml down
```

## Environment Variables

The development docker-compose.yml has hardcoded environment variables for ease of use. For production, ensure you:

1. Copy `.env.example` to `.env`
2. Update all sensitive values (passwords, JWT secrets, etc.)
3. The production setup reads from `.env` file

## Database

### Initial Setup

The MySQL container will automatically run any SQL scripts placed in `./docker/mysql/init/` on first startup.

### Migrations

Run migrations inside the container:

```bash
docker exec -it mobile_ganj_app pnpm run migration:run
```

### Reset Database

To reset the database, remove the volume:

```bash
docker-compose down -v
docker-compose up -d
```

## Volumes

- `mysql_data` - Persists MySQL database data
- `./uploads` - Mounted for file uploads
- `.:/app` (dev only) - Mounts source code for hot reload
- `/app/node_modules` (dev only) - Prevents overwriting node_modules

## Network

All services communicate through the `mobile_ganj_network` bridge network. Services can reference each other by service name (e.g., `mysql` instead of `localhost`).

## Troubleshooting

### Port already in use

If ports 3000 or 3306 are already in use, change them in docker-compose.yml:

```yaml
ports:
  - '3001:3000'  # Changes host port to 3001
```

### Permission issues with uploads

```bash
chmod -R 777 uploads
```

### Container won't start

Check logs for specific error:

```bash
docker-compose logs app
```

### Database connection issues

Ensure the app waits for MySQL health check:

```bash
docker-compose restart app
```
