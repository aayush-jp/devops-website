# Docker Deployment Guide

Complete guide for containerizing and deploying the portfolio application.

## 🐋 Docker Setup

This portfolio uses a **multi-stage Dockerfile** with Node.js 20 Alpine for minimal image size and optimal performance.

### Key Features

- ✅ **Multi-stage build** (deps → builder → runner)
- ✅ **Alpine Linux** for minimal image size (~150MB)
- ✅ **Next.js standalone output** for optimized production builds
- ✅ **Non-root user** for enhanced security
- ✅ **Health checks** for container monitoring
- ✅ **Layer caching** for faster rebuilds

## 📋 Prerequisites

- Docker Engine 20.10+ or Docker Desktop
- Docker Compose 2.0+

Check your installation:
```bash
docker --version
docker-compose --version
```

## 🚀 Quick Start

### Option 1: Docker Compose (Recommended)

Run the entire stack with a single command:

```bash
docker-compose up
```

Access the application at http://localhost:3000

To run in detached mode:
```bash
docker-compose up -d
```

Stop the application:
```bash
docker-compose down
```

### Option 2: Docker Build & Run

Build the image:
```bash
docker build -t aayush-portfolio:latest .
```

Run the container:
```bash
docker run -p 3000:3000 aayush-portfolio:latest
```

## 🔧 Configuration

### Next.js Standalone Output

The `next.config.js` is configured with `output: 'standalone'` for optimal production builds:

```javascript
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone', // Optimized for Docker
}
```

This creates a minimal standalone build with only necessary dependencies.

### Environment Variables

Create a `.env.local` file (not committed to Git):

```env
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
PORT=3000
```

## 🏗️ Multi-Stage Build Breakdown

### Stage 1: Dependencies
- Base: `node:20-alpine`
- Installs production dependencies only
- Uses `npm ci` for reproducible builds

### Stage 2: Builder
- Copies dependencies from Stage 1
- Installs all dependencies (including dev)
- Builds the Next.js application
- Creates optimized production bundle

### Stage 3: Runner
- Minimal production image
- Copies only necessary files
- Creates non-root user (nextjs:nodejs)
- Implements health checks
- Runs the application

## 📊 Image Optimization

### Size Comparison

| Configuration | Image Size |
|--------------|------------|
| node:20 (Debian) | ~1.1GB |
| node:20-alpine | ~150MB |
| Our multi-stage build | **~150MB** |

### Optimization Techniques

1. **Alpine Base Image**: Minimal Linux distribution
2. **Multi-stage Build**: Separates build and runtime dependencies
3. **Layer Caching**: Optimized COPY order for faster rebuilds
4. **.dockerignore**: Excludes unnecessary files
5. **Standalone Output**: Only includes required dependencies

## 🔐 Security Features

### Non-Root User

The container runs as a non-root user (UID 1001):
```dockerfile
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
```

### Read-Only Root Filesystem (Optional)

Add to docker-compose.yml for extra security:
```yaml
security_opt:
  - no-new-privileges:true
read_only: true
tmpfs:
  - /tmp
```

## 📈 Monitoring

### Health Checks

The Dockerfile includes a health check:
```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', ...)"
```

Check container health:
```bash
docker ps
```

View health check logs:
```bash
docker inspect --format='{{json .State.Health}}' aayush-portfolio
```

## 🛠️ Development Workflow

### Local Development (without Docker)
```bash
npm install
npm run dev
```

### Build and Test Docker Image Locally
```bash
# Build
docker build -t aayush-portfolio:test .

# Run
docker run -p 3000:3000 aayush-portfolio:test

# Test
curl http://localhost:3000
```

### Using Helper Scripts

**Linux/Mac:**
```bash
chmod +x docker-build.sh
./docker-build.sh
```

**Windows PowerShell:**
```powershell
.\docker-build.ps1
```

## 🚀 Production Deployment

### Docker Hub

1. **Tag the image:**
   ```bash
   docker tag aayush-portfolio:latest yourusername/aayush-portfolio:latest
   ```

2. **Push to Docker Hub:**
   ```bash
   docker push yourusername/aayush-portfolio:latest
   ```

### AWS ECR

1. **Authenticate:**
   ```bash
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin YOUR_ACCOUNT.dkr.ecr.us-east-1.amazonaws.com
   ```

2. **Tag and push:**
   ```bash
   docker tag aayush-portfolio:latest YOUR_ACCOUNT.dkr.ecr.us-east-1.amazonaws.com/aayush-portfolio:latest
   docker push YOUR_ACCOUNT.dkr.ecr.us-east-1.amazonaws.com/aayush-portfolio:latest
   ```

### Google Cloud Container Registry

1. **Tag the image:**
   ```bash
   docker tag aayush-portfolio:latest gcr.io/PROJECT_ID/aayush-portfolio:latest
   ```

2. **Push to GCR:**
   ```bash
   docker push gcr.io/PROJECT_ID/aayush-portfolio:latest
   ```

## 🔍 Troubleshooting

### Container won't start

Check logs:
```bash
docker logs aayush-portfolio
```

Or with docker-compose:
```bash
docker-compose logs portfolio
```

### Port already in use

Change the port mapping in `docker-compose.yml`:
```yaml
ports:
  - "3001:3000"  # Use port 3001 instead
```

### Build fails

Clear Docker cache and rebuild:
```bash
docker builder prune -a
docker-compose build --no-cache
```

### Image size too large

Check layer sizes:
```bash
docker history aayush-portfolio:latest
```

## 📚 Commands Reference

### Docker Commands

```bash
# Build image
docker build -t aayush-portfolio:latest .

# Run container
docker run -p 3000:3000 aayush-portfolio:latest

# Run in background
docker run -d -p 3000:3000 aayush-portfolio:latest

# Stop container
docker stop aayush-portfolio

# Remove container
docker rm aayush-portfolio

# View logs
docker logs -f aayush-portfolio

# Execute command in container
docker exec -it aayush-portfolio sh
```

### Docker Compose Commands

```bash
# Start services
docker-compose up

# Start in background
docker-compose up -d

# Stop services
docker-compose down

# Rebuild and start
docker-compose up --build

# View logs
docker-compose logs -f

# Scale services
docker-compose up --scale portfolio=3
```

## 🎯 Best Practices

1. ✅ Use specific version tags (not `latest` in production)
2. ✅ Implement health checks
3. ✅ Run as non-root user
4. ✅ Use multi-stage builds
5. ✅ Keep images small with Alpine
6. ✅ Use .dockerignore extensively
7. ✅ Set resource limits in docker-compose
8. ✅ Use Docker secrets for sensitive data
9. ✅ Scan images for vulnerabilities
10. ✅ Document all environment variables

## 🔒 Security Scanning

Scan for vulnerabilities:
```bash
docker scan aayush-portfolio:latest
```

Or use Trivy:
```bash
trivy image aayush-portfolio:latest
```

## 📦 CI/CD Integration

### GitHub Actions Example

```yaml
name: Docker Build

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build Docker image
        run: docker build -t aayush-portfolio:latest .
      - name: Run tests
        run: docker run aayush-portfolio:latest npm test
```

## 🎓 Learning Resources

- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Next.js Docker Deployment](https://nextjs.org/docs/deployment#docker-image)
- [Docker Security](https://docs.docker.com/engine/security/)

---

**Built with Docker 🐋 by Aayush JP**
