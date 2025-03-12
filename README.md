# lft-concept-barebones
Barebones structure for lookalike

Report set up in github.
Application created is basic node app, with express, returning text for initial page.
Requires start script.

## Heroku
Log in to Heroku
Permission given to Heroku to access GitHub
Permission in GitHub given to Heroku to access Organization
Create new app with name similar to repo (only to be nice - not needed)
Link to github
Set up automatic deployments
Pretty much done there

## Structure

## Extracting views to json

```go
go run runextract.go
```

NB You may need to run this, to download the additional package

```go
go get golang.org/x/net/html
```

## Still outstanding

/vision-zero-for-london /badly formed html with missing sectional classes

# Deployment

Deploying to AWS EC2, Linux

## Step 1 - Set up AWS EC2 Instance

Information to be provided

## Step 2 - Connect to AWS EC2 Instance

Connect through AWS Console using EC2 Instance Connect to get Terminal

#3 Step 3 - Switch to Super User

```
> sudo su -
```

## Step 4 - Install NVM & Node

Run these commands to set up nvm and mode

```
# Download and install nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# in lieu of restarting the shell
\. "$HOME/.nvm/nvm.sh"

# Download and install Node.js:
nvm install 22

# Verify the Node.js version:
node -v # Should print "v22.14.0".
nvm current # Should print "v22.14.0".

# Verify npm version:
npm -v # Should print "10.9.2".
```

## Step 5 - Install Git and clone repository from GitHub

To install git, run commands below in terminal window:

```
sudo dnf update
sudo dnf install git
```

Confirm install with `y`






