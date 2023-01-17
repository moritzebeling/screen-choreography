# Setting up a Digital Ocean server

1. Login to Digital Ocean
2. Create a droplet running Ubuntu
3. Create a DNS record

- IP `138.68.71.128`
- Domain `screens.moritzebeling.com`
- DNS `screens 60 IN A 138.68.71.128`

## Login

Register your SSH key with the Digital Ocean droplet.

```
ssh root@{IP}
```

## Installation

```
# refresh package index
sudo apt update
```

### Node.js

```
# install curl
sudo apt install curl

# install nvm
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
source ~/.bashrc

# install nodejs
nvm install node

# install pm2
npm install pm2@latest -g
```

### Let’s encrypt

https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-16-04

```
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt install -y certbot python3-certbot-nginx
```

### HTTPS

```
# check firewall status
sudo ufw status

# enable service
sudo ufw enable

# open for nginx service
sudo ufw allow 'Nginx Full'

# remove http
sudo ufw delete allow 'Nginx HTTP'

sudo ufw status
```

Double check that you’re not locking yourself out with the firewall:

```
# allow ssh
sudo ufw allow ssh

sudo ufw status
```

### SSL

```
# request new certificate
sudo certbot --nginx -d screens.moritzebeling.com

# start auto renewal
sudo certbot renew --dry-run
```

### Nginx

```
sudo nano /etc/nginx/sites-available/screens.config
```

https://socket.io/docs/v3/reverse-proxy/#nginx

```
# /etc/nginx/sites-available/screens.config
server {
    server_name screens.moritzebeling.com;

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/screens.moritzebeling.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/screens.moritzebeling.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location ~ /.well-known {
        allow all;
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
    }   
}
server {
    if ($host = screens.moritzebeling.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    server_name screens.moritzebeling.com;
    listen 80;
    return 404; # managed by Certbot
}
```

```
sudo ln -s /etc/nginx/sites-available/screens.config /etc/nginx/sites-enabled/screens.config

# verify config syntax
sudo nginx -t

# restart nginx
sudo systemctl reload nginx
```

### Project installation

```
git clone https://github.com/moritzebeling/screen-choreography.git screens
cd screens
git checkout node-server-with-socket
```

```
sudo nano .env
```
```
# .env
PUBLIC_SOCKET=https://screens.moritzebeling.com
HOST=screens.moritzebeling.com
PORT=3000
```

### Get it running

```
# get latest code
git pull
npm install

# build app
npm run build

# serve
pm2 start server/server.js
```

Use PM2 instead of Node

```
# start
pm2 start {service}

# list active services
pm2 list

# stop
pm2 stop {service}

# delete service
pm2 delete all

# monitor
pm2 monit
```

### Troubleshooting

```
# get error log
tail -f /var/log/nginx/error.log

# check nginx status
systemctl status nginx

# restart nginx
sudo systemctl restart nginx

# try to run the app via node
node server/server.js
```