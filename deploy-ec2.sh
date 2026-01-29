#!/bin/bash

# AWS EC2 Deployment Script for Aayush Portfolio
# Run this script on your EC2 instance

set -e  # Exit on error

echo "🚀 Starting deployment..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored messages
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

print_success "Docker and Docker Compose are installed"

# Stop existing containers
print_info "Stopping existing containers..."
docker-compose down || true

# Remove old images to ensure clean build
print_info "Removing old images..."
docker image prune -f

# Build with no cache to ensure fresh build
print_info "Building Docker image (this may take a few minutes)..."
docker-compose build --no-cache

# Start the application
print_info "Starting the application..."
docker-compose up -d

# Wait for container to be healthy
print_info "Waiting for application to start..."
sleep 5

# Check if container is running
if docker ps | grep -q "aayush-portfolio"; then
    print_success "Container is running!"
    
    # Show logs
    print_info "Recent logs:"
    docker-compose logs --tail=20 portfolio
    
    # Get public IP
    PUBLIC_IP=$(curl -s ifconfig.me)
    
    echo ""
    print_success "Deployment successful! 🎉"
    echo ""
    print_info "Access your portfolio at: http://$PUBLIC_IP"
    echo ""
    print_info "To view logs: docker-compose logs -f portfolio"
    print_info "To stop: docker-compose down"
    print_info "To restart: docker-compose restart"
    echo ""
else
    print_error "Container failed to start. Check logs:"
    docker-compose logs portfolio
    exit 1
fi
