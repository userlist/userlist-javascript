import NullTransport from './transport/null';
import WebsocketTransport from './transport/websocket';

import StaticTokenProvider from './token_provider/static';

export default class Userlist {
  constructor(options = {}) {
    if(typeof options === 'string') {
      options = { tokenProvider: new StaticTokenProvider(options) }
    }

    this.tokenProvider = options.tokenProvider;
    this.transport = options.transport || new WebsocketTransport();
  }

  async identify(...args) {
    let token = await this.tokenProvider.receiveToken();

    this.transport.identify(token, ...args);
  }

  async track(...args) {
    let token = await this.tokenProvider.receiveToken();

    this.transport.track(token, ...args);
  }

  close() {
    this.transport.close();
  }
};

export {
  NullTransport,
  WebsocketTransport,

  StaticTokenProvider
};
