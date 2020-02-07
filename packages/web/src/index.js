import NullTransport from './transport/null';
import WebsocketTransport from './transport/websocket';
import StaticTokenProvider from './token_provider/static';
import PromiseTokenProvider from './token_provider/promise';

export default class Userlist {
  constructor(options = {}) {
    if(typeof options === 'string') {
      options = { tokenProvider: new StaticTokenProvider(options) };
    } else if(typeof options.then === 'function') {
      options = { tokenProvider: new PromiseTokenProvider(options) };
    }

    this.tokenProvider = options.tokenProvider;
    this.transport = this.transport || options.transport || new WebsocketTransport(this.tokenProvider);
  }

  async identify(...args) {
    this.transport.identify(...args);
  }

  async track(...args) {
    this.transport.track(...args);
  }

  on(...args) {
    this.transport.on(...args);
  }

  close() {
    this.transport.close();
  }
};

export {
  NullTransport,
  WebsocketTransport,

  StaticTokenProvider,
  PromiseTokenProvider
};
