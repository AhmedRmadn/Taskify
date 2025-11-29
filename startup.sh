#!/bin/bash

chmod +x docker-entrypoint.sh
dos2unix docker-entrypoint.sh || true  # ignore if dos2unix not installed

echo "========================================"
echo "Building Docker image..."
echo "========================================"
docker build -t todo-api .

echo ""
echo "========================================"
echo "Starting containers..."
echo "========================================"
docker compose up -d

echo ""
echo "========================================"
echo "Containers status"
echo "========================================"
docker compose ps

echo ""
echo "========================================"
echo "Showing logs (Ctrl+C to exit)"
echo "========================================"
docker compose logs -f

