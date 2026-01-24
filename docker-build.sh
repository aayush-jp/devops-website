#!/bin/bash
# Build script for Docker image

echo "🐋 Building Docker image..."
docker build -t aayush-portfolio:latest .

if [ $? -eq 0 ]; then
    echo "✅ Docker image built successfully!"
    echo "📊 Image details:"
    docker images | grep aayush-portfolio
else
    echo "❌ Docker build failed!"
    exit 1
fi
