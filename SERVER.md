# How to handle the Digital Ocean server

Create a Digital Ocean droplet

## Login

Register your SSH key with the Digital Ocean droplet

```
# login
ssh root@161.35.67.18
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
```

## Run server

https://github.com/sveltejs/kit/tree/master/packages/adapter-node

```
node -r dotenv/config build
```