import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ChatService } from './services/chat.service'

import { AppComponent } from './app.component';
import { ChatMessagesComponent } from './chat-messages/chat-messages.component';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { ChannelListComponent } from './channel-list/channel-list.component'
import {routing} from './app.routing'

@NgModule({
  declarations: [
    AppComponent,
    ChatMessagesComponent,
    ChatInputComponent,
    ChannelListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing
  ],
  providers: [
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
