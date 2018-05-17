import { SocketChatUiPage } from './app.po';

describe('socket-chat-ui App', () => {
  let page: SocketChatUiPage;

  beforeEach(() => {
    page = new SocketChatUiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
