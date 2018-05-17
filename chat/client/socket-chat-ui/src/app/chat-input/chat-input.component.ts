import { Component, OnInit } from '@angular/core'
import { ChatService } from '../services/chat.service'

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent implements OnInit {

  chatMessage: string = ''
  userInput: string
  user: string
  checkTypingTimeout: any

  constructor(private chatService: ChatService) { }

  ngOnInit() { }

  sendMessage() {
    this.chatService.emitMessage(this.chatMessage)
    this.chatMessage = ''

    if (this.checkTypingTimeout) {
      clearTimeout(this.checkTypingTimeout)
      this.chatService.emitUserStopTyping()
      this.checkTypingTimeout = null
    }
  }

  enterChat() {
    this.chatService.newUser(this.userInput)
    this.userInput = ''
    this.user = this.chatService.getUser()
  }


  startTyping() {
    if (this.checkTypingTimeout) {
      clearTimeout(this.checkTypingTimeout)
    } else {
      this.chatService.emitUserTyping()
    }

    this.checkTypingTimeout = setTimeout(() => {
      this.chatService.emitUserStopTyping()
      this.checkTypingTimeout = null
    }, 2000)
  }

}
