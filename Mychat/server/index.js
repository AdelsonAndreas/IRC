const mongo = require('mongodb').MongoClient;
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const socketio = require('socket.io')
const io = socketio(server)
const port = 3001

// On se connecte à la base de données
// N'oubliez pas de lancer ~/mongodb/bin/mongod dans un terminal !
mongo.connect('mongodb://localhost/Mychat', function (err,db) {
    if (err) { throw err; }

    console.log("Mongodb Connected ...");

// Connection à socket.io 
    io.on('connection', function(socket){
        console.log("New connection");
        socket.emit('hello', {greeting: "Hello andreas"});
       // let Messagechat = db.collection('Messagechats');
    });

});     

server.listen(port, () => console.log('Listening on ', port))


