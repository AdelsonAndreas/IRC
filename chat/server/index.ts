const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const socketio = require('socket.io')
const io = socketio(server)
const port = 3001
const router = express.Route()

import socketEvents from '../shared/chat/socketEvents'
import ChatMessage from '../shared/chat/chatMessage'
import UserMessage from '../shared/chat/userMessage'

io.on(socketEvents.CONNECTION, (socket: any) => {
    socket.on(socketEvents.NEW_USER, (user: any) => socket.user = user)

    socket.on(socketEvents.USER_JOINED_CHANNEL, (channel: any) => {
        const user = new UserMessage(socket.id, socket.user)
        if (socket.channel) {
            socket.leave(socket.channel)
            io.to(socket.channel).emit(socketEvents.USER_LEFT, user)
        }

        socket.channel = channel
        io.to(socket.channel).emit(socketEvents.USER_JOINED_CHANNEL, user)
        socket.join(channel)
    })

    socket.on(socketEvents.MESSAGE, (message: any) => {
        const messagePayload = new ChatMessage(message, socket.user)

        if (socket.channel) {
            io.to(socket.channel).emit(socketEvents.MESSAGE, messagePayload)

        }

    })

    socket.on(socketEvents.USER_TYPING, () => {
        const user = new UserMessage(socket.id, socket.user)

        if (socket.channel) {
            io.to(socket.channel).emit(socketEvents.USER_TYPING, user)
        }
    })

    socket.on(socketEvents.USER_STOPPED_TYPING, () => {
        const user = new UserMessage(socket.id, socket.user)

        if (socket.channel) {
            io.to(socket.channel).emit(socketEvents.USER_STOPPED_TYPING, user)
        }
    })

    socket.on(socketEvents.DISCONNECT, () => {
        const user = new UserMessage(socket.id, socket.user)

        if (socket.channel) {
            io.to(socket.channel).emit(socketEvents.USER_LEFT, user)
        }
    })
})
server.listen(port, () => console.log('Listening on ', port))
//////////////////////////////////////////////////////////////////////

//MONGOOSE

/////////////////////////////*/

var mongoose = require('mongoose');

// On se connecte à la base de données
// N'oubliez pas de lancer ~/mongodb/bin/mongod dans un terminal !
mongoose.connect('mongodb://localhost/irc', function (err : any) {
    if (err) { throw err; }
});

// Création du schéma 
var users = new mongoose.Schema({
    name: { type: String, match: /^[a-zA-Z0-9-_]+$/ },
    password: String,
    date: { type: Date, default: Date.now }
});

// Création du Model 
var PseudoModel = mongoose.model('name', users);

// On crée une instance du Model
var monPseudo = new PseudoModel({ name: 'salman' });

//app.post('/newUsers',(req: any,res: any)=>{
//    new users(  {
//        name: req.body.name,
//        password: req.body.password,
//        date: { type: Date, default: Date.now }
//    }).save((err:any,doc:any)=>{
//        if(err)res.json(err);
//        else res.send("Succes");
//    })
//})
//app.get('/newUsers',(req: any, res: any )=>{
// req.users.find({"name": "Andreas"});
//})


// On le sauvegarde dans MongoDB !