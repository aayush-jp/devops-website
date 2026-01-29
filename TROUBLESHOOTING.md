# 🔧 Troubleshooting Guide

Common issues and solutions for deploying the portfolio.

---

## 🐛 Docker Build Errors

### Error: "Cannot find module 'tailwindcss'"

**Cause**: DevDependencies not being installed during build.

**Solution**:
```bash
# Rebuild with no cache
docker-compose build --no-cache

# Or manually build
docker build --no-cache -t aayush-portfolio:latest .
```

**Prevention**: The Dockerfile has been updated to ensure all dependencies (including devDependencies) are installed before the build.

---

### Error: "Module not found: Can't resolve '@/components/...'"

**Cause**: Source files not being copied correctly or path mappings not working.

**Solution**:
1. Ensure all files are in the correct location:
   ```bash
   ls -la components/
   ```

2. Check `.dockerignore` isn't excluding important files:
   ```bash
   cat .dockerignore
   ```

3. Rebuild with no cache:
   ```bash
   docker-compose build --no-cache
   ```

---

### Error: "port is already allocated"

**Cause**: Port 80 is being used by another service.

**Solution**:
```bash
# Check what's using port 80
sudo netstat -tulpn | grep :80

# If Apache is running
sudo systemctl stop apache2
sudo systemctl disable apache2

# If Nginx is running (and you don't need it)
sudo systemctl stop nginx
sudo systemctl disable nginx

# Then restart your container
docker-compose up -d
```

---

### Error: "Permission denied" on port 80

**Cause**: Non-root user can't bind to privileged ports (< 1024).

**Solution**:
```bash
# Option 1: Run with sudo
sudo docker-compose up -d

# Option 2: Allow Docker to use port 80
sudo setcap CAP_NET_BIND_SERVICE=+eip /usr/bin/docker-proxy

# Then restart
docker-compose up -d
```

---

## 🚀 Deployment Issues

### Container starts but website doesn't load

**Check 1: Container status**
```bash
docker ps
docker-compose logs portfolio
```

**Check 2: Port mapping**
```bash
docker ps -a
# Should show: 0.0.0.0:80->3000/tcp
```

**Check 3: Health check**
```bash
docker inspect aayush-portfolio | grep -A 10 "Health"
```

**Check 4: Security group (AWS)**
- Ensure port 80 is open in EC2 Security Group
- Source: 0.0.0.0/0 (or your IP)

---

### Website loads but shows 404

**Cause**: Next.js build may have failed.

**Solution**:
```bash
# Check build logs
docker-compose logs portfolio | grep "build"

# Rebuild
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

---

### Images or fonts not loading

**Cause**: Static files not copied correctly.

**Solution**:
1. Check if files exist in container:
   ```bash
   docker exec -it aayush-portfolio sh
   ls -la public/
   ls -la .next/static/
   exit
   ```

2. Rebuild if missing:
   ```bash
   docker-compose build --no-cache
   docker-compose up -d
   ```

---

## 🔄 Update & Redeploy

### After code changes

```bash
# Pull latest changes (if using Git)
git pull origin main

# Rebuild and deploy
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Check logs
docker-compose logs -f portfolio
```

---

### Quick restart (no code changes)

```bash
docker-compose restart
```

---

## 📊 Performance Issues

### High CPU usage

**Check 1: Resource limits**
```bash
docker stats
```

**Solution**: Add resource limits in `docker-compose.yml`:
```yaml
deploy:
  resources:
    limits:
      cpus: '0.5'
      memory: 512M
```

---

### Slow loading

**Check 1: Build size**
```bash
docker images | grep aayush-portfolio
```

**Check 2: Network**
```bash
# Test from EC2
curl -o /dev/null -s -w 'Total: %{time_total}s\n' http://localhost:80
```

---

## 🔍 Debugging Commands

### View all logs
```bash
docker-compose logs -f
```

### View last 100 lines
```bash
docker-compose logs --tail=100 portfolio
```

### Check container details
```bash
docker inspect aayush-portfolio
```

### Access container shell
```bash
docker exec -it aayush-portfolio sh
```

### Check Next.js build output
```bash
docker exec -it aayush-portfolio ls -la .next/
```

### Test health endpoint
```bash
curl http://localhost:3000
```

---

## 🧹 Cleanup Commands

### Remove all stopped containers
```bash
docker container prune
```

### Remove unused images
```bash
docker image prune -a
```

### Full cleanup (careful!)
```bash
docker system prune -a --volumes
```

### Reset and rebuild
```bash
docker-compose down -v
docker system prune -a
docker-compose build --no-cache
docker-compose up -d
```

---

## 🔐 Security Issues

### Can't SSH to EC2

**Check 1: Security Group**
- Port 22 should be open
- Source should be your IP or 0.0.0.0/0

**Check 2: Key permissions**
```bash
chmod 400 your-key.pem
```

**Check 3: Correct username**
```bash
# For Ubuntu AMI
ssh -i your-key.pem ubuntu@YOUR_IP

# For Amazon Linux
ssh -i your-key.pem ec2-user@YOUR_IP
```

---

### Port 80 blocked

**Check firewall:**
```bash
sudo ufw status
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

---

## 📝 Logs & Monitoring

### Enable Docker logs
```bash
# Check current log config
docker inspect aayush-portfolio | grep -A 10 "LogConfig"

# Logs location
/var/lib/docker/containers/<container-id>/<container-id>-json.log
```

### Monitor in real-time
```bash
# CPU, Memory, Network
docker stats aayush-portfolio

# Logs
docker-compose logs -f --tail=50 portfolio
```

---

## 🆘 Emergency Procedures

### Complete reset

```bash
#!/bin/bash
# Stop everything
docker-compose down -v

# Remove all containers
docker rm -f $(docker ps -aq)

# Remove all images
docker rmi -f $(docker images -q)

# Clean system
docker system prune -a --volumes -f

# Rebuild from scratch
docker-compose build --no-cache
docker-compose up -d
```

### Backup before reset

```bash
# Backup logs
docker-compose logs portfolio > backup-logs.txt

# Backup data (if any)
docker cp aayush-portfolio:/app/data ./backup-data/
```

---

## 📞 Getting Help

### Check Docker version
```bash
docker --version
docker-compose --version
```

### System information
```bash
uname -a
cat /etc/os-release
df -h
free -h
```

### Network diagnostics
```bash
# Check listening ports
sudo netstat -tulpn

# Check DNS
nslookup google.com

# Check connectivity
ping -c 3 google.com
```

---

## 🎯 Quick Fixes

### Build failing? Try:
```bash
docker-compose build --no-cache
```

### Container won't start? Try:
```bash
docker-compose down
docker-compose up -d
docker-compose logs
```

### Website not accessible? Check:
1. Security Group port 80
2. Docker container status: `docker ps`
3. Logs: `docker-compose logs`
4. Health: `docker inspect aayush-portfolio`

### Out of space? Clean:
```bash
docker system prune -a
```

---

## ✅ Health Check Checklist

Run these commands to verify everything:

```bash
# 1. Docker running?
docker ps | grep aayush-portfolio

# 2. Logs clean?
docker-compose logs --tail=50 portfolio

# 3. Health check passing?
docker inspect aayush-portfolio | grep -A 5 "Health"

# 4. Port accessible?
curl http://localhost:80

# 5. Public access?
curl http://$(curl -s ifconfig.me)
```

If all pass ✅ - You're good!

---

**Still having issues?** Check the full deployment guide in `AWS_EC2_DEPLOYMENT.md`
