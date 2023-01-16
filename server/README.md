# How to handle the Digital Ocean server

Create a Digital Ocean droplet.
Current IP is `161.35.67.18`

## Login

Register your SSH key with the Digital Ocean droplet

```
# login
ssh root@{IP}
```

## Droplet installation

```
# refresh package index
sudo apt update

# install curl
sudo apt install curl

# install nvm
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
source ~/.bashrc

# install nodejs
nvm install node
nvm use 19
```

## Project installation

```
git clone https://github.com/moritzebeling/choreography.git
cd choreography

npm install

sudo nano .env

npm run build
```

```
# .env
PUBLIC_SOCKET=http://{IP}:3000
HOST={IP}
PORT=3000
```

## Run server

https://github.com/sveltejs/kit/tree/master/packages/adapter-node

```
node -r dotenv/config build
node -r dotenv/config server.js
```