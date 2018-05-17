import {Routes, RouterModule} from "@angular/router";
import { ChatMessagesComponent } from "./chat-messages/chat-messages.component";
import { ChatInputComponent } from "./chat-input/chat-input.component";

const APP_ROUTES :Routes = [
    {path: "./channel", component: ChatMessagesComponent},
    {path: '', redirectTo: '/channel', pathMatch:'full'}
];

export const routing = RouterModule.forRoot(APP_ROUTES);