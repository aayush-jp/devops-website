# ⚡ Quick Deploy - AWS EC2

**5-minute deployment guide for your portfolio.**

---

## 🎯 On Your EC2 Instance

### 1. Upload Files

```bash
# From your local machine
scp -i your-key.pem -r c:\devops ubuntu@YOUR_EC2_IP:~/
```

**Or use Git:**
```bash
# On EC2
git clone https://github.com/YOUR_USERNAME/portfolio.git
cd portfolio
```

---

### 2. Run Deployment Script

```bash
# Make script executable
chmod +x deploy-ec2.sh

# Run deployment
./deploy-ec2.sh
```

**That's it!** 🎉

---

## 📋 Manual Deployment (if script fails)

```bash
# 1. Stop any running containers
docker-compose down

# 2. Build fresh image
docker-compose build --no-cache

# 3. Start the application
docker-compose up -d

# 4. Check status
docker-compose ps
docker-compose logs -f
```

---

## ✅ Verify Deployment

```bash
# Check container is running
docker ps

# Check logs
docker-compose logs portfolio

# Get your public IP
curl ifconfig.me

# Test locally on EC2
curl http://localhost:80

# Test from outside
curl http://YOUR_PUBLIC_IP
```

---

## 🔧 Common Issues

### Build fails with "Cannot find module 'tailwindcss'"

```bash
# Solution: Rebuild with no cache
docker-compose build --no-cache
docker-compose up -d
```

### Port 80 permission denied

```bash
# Solution: Run with sudo
sudo docker-compose up -d
```

### Container won't start

```bash
# Check logs
docker-compose logs portfolio

# Check if port 80 is used
sudo netstat -tulpn | grep :80

# Stop Apache/Nginx if needed
sudo systemctl stop apache2
sudo systemctl stop nginx

# Try again
docker-compose up -d
```

---

## 🌐 Access Your Site

**After successful deployment:**

```
http://YOUR_EC2_PUBLIC_IP
```

**Example:**
```
http://54.123.45.67
```

---

## 🔄 Update After Changes

```bash
# Pull changes (if using Git)
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

---

## 📊 Useful Commands

```bash
# View logs
docker-compose logs -f portfolio

# Restart
docker-compose restart

# Stop
docker-compose down

# Check status
docker-compose ps

# Check resources
docker stats

# Access container shell
docker exec -it aayush-portfolio sh
```

---

## 🚨 Emergency Reset

```bash
# Complete reset and rebuild
docker-compose down -v
docker system prune -a -f
docker-compose build --no-cache
docker-compose up -d
```

---

## 🎉 Success Indicators

✅ `docker ps` shows container running  
✅ `docker-compose logs` shows no errors  
✅ `curl localhost:80` returns HTML  
✅ Website accessible from browser  

---

## 📞 Need Help?

See detailed guides:
- **Full deployment**: `AWS_EC2_DEPLOYMENT.md`
- **Troubleshooting**: `TROUBLESHOOTING.md`
- **Docker details**: `DOCKER.md`

---

**Your portfolio will be live in under 5 minutes! 🚀**
