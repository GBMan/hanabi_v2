This project is a simulation of the card game Hanabi made by Antoine Bauza.

The IA is under development, but the game is a playable by human players.
The code is modified to avoid the IAs until it's completed. Search for the ###IA### tag.

# INSTALL

## Setup with
`npm init -y`
`npx create-react-app`
`npm i underscore`
`npm i --save-dev node-sass`

## Install
`npm i`


# RUN

## Live reload
`npm start`

## Prod build
`npm run build`


# GIT

## First time
`git add *`
Add the new files and modifications.

`git commit -m "Message."`
Prepare the package to send with a description.

`git remote add origin https://github.com/GBMan/hanabi_v2.git`
!!! Only the first time to create the remote on git. !!!

`git push -u origin master`
Push the datas on git.

## Next times
`git add *`
Add the new files and modifications.

`git commit -m "Message."`
Prepare the package to send with a description.

`git push`
Push the datas on git.


# HEROKU

## Setup

### Create account
`https://www.heroku.com/`

### Install cli
`https://devcenter.heroku.com/articles/heroku-cli`
Reload the computer

### Create New App
`https://dashboard.heroku.com/`
Go to the Settings tab
Click "Add buildpack"
Enter the following Buildpack URL: `https://github.com/mars/create-react-app-buildpack`
Save changes

try `https://buildpack-registry.s3.amazonaws.com/buildpacks/mars/create-react-app.tgz`

try `heroku buildpacks:set https://github.com/mars/create-react-app-buildpack.git`

### Create the remote on Heroku
Assuming the git repository is already created.
`heroku git:remote -a gb-hanabi`

## Deploy
### Connection in the terminal
`heroku login`
Open a web page in a browser for connection

### Deploy the files
`git push heroku master`
Push the last git project version git on Heroku.


# MISC

## Fonts
Pictos gets on http://glyphter.com