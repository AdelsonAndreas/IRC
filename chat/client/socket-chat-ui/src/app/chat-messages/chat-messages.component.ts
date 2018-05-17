import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable'

import { ChatService } from '../services/chat.service'

import socketEvents from '../../../../../shared/chat/socketEvents'
import ChatMessage from '../../../../../shared/chat/chatMessage'
import UserMessage from '../../../../../shared/chat/userMessage'

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css']
})
export class ChatMessagesComponent implements OnInit {

  messageObservable: Observable<ChatMessage>
  messages: Array<ChatMessage> = []

  usersTypingObservable: Observable<UserMessage>
  usersStopTypingObservable: Observable<UserMessage>
  usersTyping: Array<UserMessage> = []

  usersJoinedObservable: Observable<UserMessage>
  usersLeftObservable: Observable<UserMessage>

  usersJoined: Array<UserMessage> = []
  usersLeft: Array<UserMessage> = []

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.messageObservable = this.chatService.getMessages()
    this.messageObservable.subscribe((message: ChatMessage) => this.messages.unshift(message))

    this.usersTypingObservable = this.chatService.getUserTypingObservable()
    this.usersTypingObservable.subscribe((user: UserMessage) => this.usersTyping.push(user))

    this.usersStopTypingObservable = this.chatService.getUserStopTypingObservable()
    this.usersStopTypingObservable.subscribe((user: UserMessage) => this.onUserStoppedTyping(user))

    this.usersJoinedObservable = this.chatService.getUserJoinedObservable()
    this.usersJoinedObservable.subscribe((user: UserMessage) => this.onUserJoined(user))

    this.usersLeftObservable = this.chatService.getUserLeftObservable()
    this.usersLeftObservable.subscribe((user: UserMessage) => this.onUserLeft(user))

    // Clear messages when changing channels
    this.chatService.getChannelJoinedEmmiter().subscribe((channel: string) => {
      this.messages = []
      this.usersTyping = []
    })
  }

  onUserStoppedTyping(user: UserMessage) {
    this.usersTyping = this.usersTyping.filter((item) => item.id !== user.id)
  }

  onUserJoined(user: UserMessage) {
    this.usersJoined.push(user)

    setTimeout(() => {
      this.usersJoined = this.usersJoined.filter((item) => item !== user)
    }, 4000)
  }

  onUserLeft(user: UserMessage) {
    this.usersLeft.push(user)

    setTimeout(() => {
      this.usersLeft = this.usersLeft.filter((item) => item !== user)
    }, 4000)
  }

}
