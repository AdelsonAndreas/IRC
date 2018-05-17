let module: any;

const socketEvents = {
    CONNECTION: 'connection',
    DISCONNECT: 'disconnect',
    MESSAGE: 'message',
    NEW_USER: 'new user',
    USER_LEFT: 'user left',
    USER_JOINED_CHANNEL: 'user joined channel',
    USER_TYPING: 'user typing',
    USER_STOPPED_TYPING: 'user stopped typing'
}

export default socketEvents