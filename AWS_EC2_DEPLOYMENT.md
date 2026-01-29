# 🚀 AWS EC2 Deployment Guide

Complete guide to deploying your portfolio on AWS EC2 using Docker.

---

## 📋 Prerequisites

- AWS Account
- SSH key pair for EC2
- Domain name (optional, recommended)

---

## 🖥️ Step 1: Launch EC2 Instance

### Instance Configuration

1. **Go to EC2 Dashboard**
   - Navigate to AWS Console → EC2 → Launch Instance

2. **Instance Settings:**
   ```
   Name: aayush-portfolio
   AMI: Ubuntu Server 22.04 LTS (Free Tier Eligible)
   Instance Type: t2.micro (Free Tier) or t2.small
   Key Pair: Create new or select existing
   ```

3. **Network Settings:**
   - Create new security group or use existing
   - Allow SSH from your IP
   - Allow HTTP traffic (port 80)
   - Allow HTTPS traffic (port 443) - for future SSL

### Security Group Rules

| Type | Protocol | Port Range | Source | Description |
|------|----------|------------|--------|-------------|
| SSH | TCP | 22 | Your IP/0.0.0.0/0 | SSH access |
| HTTP | TCP | 80 | 0.0.0.0/0 | Website traffic |
| HTTPS | TCP | 443 | 0.0.0.0/0 | SSL traffic (future) |

4. **Storage:**
   - 8-20 GB gp3 (default is fine)

5. **Launch Instance**

---

## 🔐 Step 2: Connect to Your EC2 Instance

### Using SSH (Mac/Linux/Git Bash)

```bash
# Set permissions on your key
chmod 400 your-key.pem

# Connect to instance
ssh -i your-key.pem ubuntu@YOUR_EC2_PUBLIC_IP
```

### Using PowerShell (Windows)

```powershell
ssh -i .\your-key.pem ubuntu@YOUR_EC2_PUBLIC_IP
```

---

## 🛠️ Step 3: Install Docker on EC2

Once connected to your EC2 instance:

```bash
# Update packages
sudo apt update
sudo apt upgrade -y

# Install Docker
sudo apt install -y docker.io

# Start and enable Docker
sudo systemctl start docker
sudo systemctl enable docker

# Add ubuntu user to docker group (no need for sudo)
sudo usermod -aG docker ubuntu

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installations
docker --version
docker-compose --version

# IMPORTANT: Log out and back in for group changes
exit
```

**Reconnect to EC2 after logging out**

---

## 📦 Step 4: Deploy Your Portfolio

### Option A: From Git Repository (Recommended)

```bash
# Install Git
sudo apt install -y git

# Clone your repository
git clone https://github.com/aayush-jp/portfolio.git
cd portfolio

# Build and run with Docker Compose
docker-compose up -d

# Check status
docker-compose ps
docker-compose logs -f
```

### Option B: Build Locally and Push to Docker Hub

**On Your Local Machine:**

```bash
# Login to Docker Hub
docker login

# Build and tag image
docker build -t yourusername/aayush-portfolio:latest .

# Push to Docker Hub
docker push yourusername/aayush-portfolio:latest
```

**On EC2:**

```bash
# Pull and run
docker pull yourusername/aayush-portfolio:latest
docker run -d -p 80:3000 --name portfolio yourusername/aayush-portfolio:latest
```

### Option C: Transfer Files with SCP

**From Your Local Machine:**

```bash
# Create a tarball
tar -czf portfolio.tar.gz .

# Copy to EC2
scp -i your-key.pem portfolio.tar.gz ubuntu@YOUR_EC2_IP:~

# On EC2
ssh -i your-key.pem ubuntu@YOUR_EC2_IP
tar -xzf portfolio.tar.gz
cd portfolio
docker-compose up -d
```

---

## ✅ Step 5: Verify Deployment

### Check Docker Status

```bash
# View running containers
docker ps

# Check logs
docker-compose logs portfolio

# Check health
docker inspect aayush-portfolio | grep -A 5 "Health"
```

### Test Access

1. **Get your EC2 public IP:**
   ```bash
   curl ifconfig.me
   ```

2. **Access your portfolio:**
   ```
   http://YOUR_EC2_PUBLIC_IP
   ```

---

## 🌐 Step 6: Configure Domain (Optional)

### Using Route 53

1. **Purchase/Configure Domain:**
   - Go to Route 53 → Hosted Zones
   - Create A record pointing to EC2 public IP

2. **DNS Record:**
   ```
   Type: A
   Name: @ (or subdomain)
   Value: YOUR_EC2_PUBLIC_IP
   TTL: 300
   ```

3. **Update Metadata:**
   - Edit `app/layout.tsx`
   - Change `metadataBase` to your domain

---

## 🔒 Step 7: Add SSL/HTTPS (Recommended)

### Using Certbot & Let's Encrypt

```bash
# Install Nginx as reverse proxy
sudo apt install -y nginx

# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Configure Nginx
sudo nano /etc/nginx/sites-available/portfolio
```

**Nginx Configuration:**

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**Enable and Get SSL:**

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal (should be automatic)
sudo certbot renew --dry-run
```

**Update Docker Compose:**

```yaml
ports:
  - "3000:3000"  # Change back since Nginx will proxy
```

---

## 📊 Step 8: Monitoring & Maintenance

### Useful Commands

```bash
# View logs
docker-compose logs -f --tail=100 portfolio

# Restart container
docker-compose restart

# Stop container
docker-compose down

# Update and redeploy
git pull origin main
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# View resource usage
docker stats

# Clean up unused images
docker system prune -a
```

### Setup Log Rotation

```bash
# Configure Docker log limits
sudo nano /etc/docker/daemon.json
```

Add:
```json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
```

```bash
sudo systemctl restart docker
docker-compose up -d
```

---

## 🔧 Troubleshooting

### Port 80 Access Denied

If you get "permission denied" on port 80:

```bash
# Allow Docker to use privileged ports
sudo setcap CAP_NET_BIND_SERVICE=+eip /usr/bin/docker-proxy
```

Or run with sudo:
```bash
sudo docker-compose up -d
```

### Container Won't Start

```bash
# Check logs
docker-compose logs portfolio

# Check if port 80 is already in use
sudo netstat -tulpn | grep :80

# Stop conflicting service (if Apache/Nginx)
sudo systemctl stop apache2
sudo systemctl stop nginx
```

### Can't Access Website

1. **Check Security Group:**
   - Ensure port 80 is open in AWS Console

2. **Check Docker:**
   ```bash
   docker ps
   curl localhost:3000
   curl localhost:80
   ```

3. **Check Firewall:**
   ```bash
   sudo ufw status
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   ```

### Out of Disk Space

```bash
# Check space
df -h

# Clean Docker
docker system prune -a --volumes

# Remove old images
docker image prune -a
```

---

## 💰 Cost Optimization

### Free Tier (First 12 Months)

- **EC2 t2.micro**: 750 hours/month (always-on)
- **Elastic IP**: Free if attached to running instance
- **Data Transfer**: 15 GB/month outbound

### After Free Tier

- **t2.micro**: ~$8-10/month
- **t2.small**: ~$17/month
- **t2.medium**: ~$35/month

**Recommendation**: Start with t2.micro, upgrade if needed.

---

## 🚀 CI/CD Setup (Optional)

### GitHub Actions Deployment

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to EC2

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to EC2
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ubuntu
          key: ${{ secrets.EC2_SSH_KEY }}
          script: |
            cd ~/portfolio
            git pull origin main
            docker-compose down
            docker-compose build --no-cache
            docker-compose up -d
```

Add secrets in GitHub:
- `EC2_HOST`: Your EC2 public IP
- `EC2_SSH_KEY`: Your private key content

---

## ✅ Deployment Checklist

### Before Deployment
- [ ] Update `app/layout.tsx` with actual domain
- [ ] Replace `public/resume.pdf`
- [ ] Create `public/og-image.png`
- [ ] Update all social links
- [ ] Test Docker build locally

### EC2 Setup
- [ ] Launch EC2 instance
- [ ] Configure security groups (ports 22, 80, 443)
- [ ] Assign Elastic IP (optional, prevents IP changes)
- [ ] Install Docker & Docker Compose
- [ ] Clone repository or transfer files

### Deployment
- [ ] Run `docker-compose up -d`
- [ ] Verify container is running
- [ ] Test access via public IP
- [ ] Configure domain (if applicable)
- [ ] Setup SSL certificate
- [ ] Test HTTPS access

### Post-Deployment
- [ ] Setup monitoring
- [ ] Configure backups
- [ ] Setup log rotation
- [ ] Test all features
- [ ] Submit sitemap to Google
- [ ] Share on LinkedIn

---

## 📊 Performance Tuning

### Docker Resource Limits

Update `docker-compose.yml`:

```yaml
services:
  portfolio:
    # ... existing config ...
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

### Enable Gzip in Next.js

Already configured in Next.js, but verify in `next.config.js`:

```javascript
module.exports = {
  compress: true,
  // ... other config
}
```

---

## 🔐 Security Best Practices

### 1. Update Regularly

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Update Docker images
docker-compose pull
docker-compose up -d
```

### 2. Fail2Ban (Prevent Brute Force)

```bash
sudo apt install -y fail2ban
sudo systemctl enable fail2ban
```

### 3. Disable Root Login

```bash
sudo nano /etc/ssh/sshd_config
# Set: PermitRootLogin no
sudo systemctl restart sshd
```

### 4. Use Elastic IP

Prevents IP changes on instance restart:
- EC2 Dashboard → Elastic IPs
- Allocate new address
- Associate with your instance

---

## 📈 Monitoring Setup

### CloudWatch Logs

1. Install CloudWatch agent on EC2
2. Configure log groups
3. Monitor Docker logs

### Simple Uptime Monitoring

```bash
# Install simple monitoring script
cat > ~/check-site.sh << 'EOF'
#!/bin/bash
URL="http://localhost:80"
if curl -s --head "$URL" | grep "200 OK" > /dev/null; then
   echo "$(date): Site is UP"
else
   echo "$(date): Site is DOWN - Restarting..."
   cd ~/portfolio && docker-compose restart
fi
EOF

chmod +x ~/check-site.sh

# Add to crontab (check every 5 minutes)
(crontab -l 2>/dev/null; echo "*/5 * * * * ~/check-site.sh >> ~/uptime.log 2>&1") | crontab -
```

---

## 🎯 Quick Commands Reference

```bash
# Start portfolio
docker-compose up -d

# Stop portfolio
docker-compose down

# View logs
docker-compose logs -f

# Restart
docker-compose restart

# Update code and redeploy
git pull && docker-compose up -d --build

# Check resource usage
docker stats

# Access container shell
docker exec -it aayush-portfolio sh

# View public IP
curl ifconfig.me
```

---

## 🎉 You're Live!

Your portfolio is now deployed on AWS EC2 and accessible at:
- **HTTP**: `http://YOUR_EC2_PUBLIC_IP`
- **Domain**: `http://yourdomain.com` (if configured)
- **HTTPS**: `https://yourdomain.com` (after SSL setup)

**Share your portfolio:**
- LinkedIn
- GitHub profile
- Resume
- Email signature

---

## 📞 Support & Resources

### AWS Documentation
- EC2: https://docs.aws.amazon.com/ec2/
- Route 53: https://docs.aws.amazon.com/route53/
- Certificate Manager: https://docs.aws.amazon.com/acm/

### Docker Documentation
- Docker: https://docs.docker.com
- Compose: https://docs.docker.com/compose/

### Troubleshooting
- Check logs: `docker-compose logs`
- AWS Support: Console → Support Center
- Community: Stack Overflow, AWS Forums

---

**Your portfolio is production-ready on AWS! 🚀**
