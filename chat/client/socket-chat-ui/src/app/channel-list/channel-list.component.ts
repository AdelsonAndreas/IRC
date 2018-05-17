import { Component, OnInit } from '@angular/core';

import { ChatService } from '../services/chat.service'

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.css']
})
export class ChannelListComponent implements OnInit {

  channels: Array<string> = ['general', 'javascript', 'c#', 'java', 'c++', 'python']
  channel: string
  mychannels : Array<string>
  constructor(private chatService: ChatService) { }

  ngOnInit() {
    // Default to first channel on connection
    this.chatService.getConnectedEmitter().subscribe(() => this.joinChannel(this.channels[0]))
  }

  joinChannel(channel) {
    this.chatService.joinChannel(channel)
    this.channel = channel
  }

  isCurrentChannel(channel) {
    return channel === this.channel
  }
  isMychannels(channel){
    this.mychannels.push(channel)
  }

}
