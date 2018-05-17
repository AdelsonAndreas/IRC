import { Injectable, EventEmitter } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import * as io from 'socket.io-client'

import socketEvents from '../../../../../shared/chat/socketEvents'
import ChatMessage from '../../../../../shared/chat/chatMessage'
import UserMessage from '../../../../../shared/chat/userMessage'

@Injectable()
export class ChatService {
  connected: EventEmitter<string>
  channelJoined: EventEmitter<string>
  url: string = 'http://localhost:3001'
  socket: any;
  user: string;

  constructor() {
    this.socket = io(this.url)
    this.connected = new EventEmitter()
    this.channelJoined = new EventEmitter()
  }

  getUser() {
    return this.user
  }

  getSocketId() {
    return this.socket.id
  }

  newUser(user) {
    this.user = user
    this.socket.emit(socketEvents.NEW_USER, user)
    this.connected.emit(user)
  }

  getConnectedEmitter() {
    return this.connected
  }

  getChannelJoinedEmmiter() {
    return this.channelJoined
  }

  joinChannel(channel) {
    this.socket.emit(socketEvents.USER_JOINED_CHANNEL, channel)
    this.channelJoined.emit(channel)
  }

  emitMessage(message) {
    this.socket.emit(socketEvents.MESSAGE, message)
  }

  emitUserTyping() {
    this.socket.emit(socketEvents.USER_TYPING)
  }

  emitUserStopTyping() {
    this.socket.emit(socketEvents.USER_STOPPED_TYPING)
  }

  getMessages() {
    return new Observable<ChatMessage>(observer => {
      this.socket.on(socketEvents.MESSAGE, (data: ChatMessage) => observer.next(data))
    })
  }

  getUserJoinedObservable() {
    return new Observable<UserMessage>(observer => {
      this.socket.on(socketEvents.USER_JOINED_CHANNEL, (data: UserMessage) => {
        if (data.id !== this.socket.id) {
          observer.next(data)
        }
      })
    })
  }

  getUserLeftObservable() {
    return new Observable<UserMessage>(observer => {
      this.socket.on(socketEvents.USER_LEFT, (data: UserMessage) => {
        if (data.id !== this.socket.id) {
          observer.next(data)
        }
      })
    })
  }

  getUserTypingObservable() {
    return new Observable<UserMessage>(observer => {
      this.socket.on(socketEvents.USER_TYPING, (data: UserMessage) => {
        if (data.id !== this.socket.id) {
          observer.next(data)
        }
      })
    })
  }

  getUserStopTypingObservable() {
    return new Observable<UserMessage>(observer => {
      this.socket.on(socketEvents.USER_STOPPED_TYPING, (data: UserMessage) => {
        if (data.id !== this.socket.id) {
          observer.next(data)
        }
      })
    })
  }

}
