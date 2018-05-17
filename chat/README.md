Instructions to run this project

Prerequisites: Install Node.js, npm, and @angular/cli

Make sure you have an up to date version of Node.js.  I ran into an issue trying to run the client app on v4.4.4 on one of my machines.

Server
======
1. Clone the project from Github
2. Open up a terminal/cmd in this project folder
3. cd server/
4. npm install
5. Make sure nodemon is installed globally: npm install -g nodemon
6. Install ts-node globally: npm install -g ts-node
7. npm start

Client
======
1. Open up a second terminal/cmd in the project folder
2. cd client/socket-chat-ui/
3. npm install
4. ng serve