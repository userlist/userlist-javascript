import NullTransport from './transport/null';
import WebsocketTransport from './transport/websocket';
import WidgetTransport from './transport/widget';
import StaticTokenProvider from './token_provider/static';
import PromiseTokenProvider from './token_provider/promise';

import { Widget } from '@userlist/widget';

class Userlist {
  constructor(options = {}) {
    if(typeof options === 'string') {
      options = { tokenProvider: new StaticTokenProvider(options) };
    } else if(typeof options.then === 'function') {
      options = { tokenProvider: new PromiseTokenProvider(options) };
    }

    this.tokenProvider = options.tokenProvider;

    if(options.widget !== false) {
      this.widget = new Widget(this.tokenProvider);
      this.transport = options.transport || new WidgetTransport(this.widget);
    } else {
      this.transport = options.transport || new WebsocketTransport(this.tokenProvider);
    }
  }

  async identify(...args) {
    this.transport.identify(...args);
  }

  async track(...args) {
    this.transport.track(...args);
  }

  async openMessage(...args) {
    this.transport.openMessage(...args);
  }

  async closeMessage(...args) {
    this.transport.openMessage(...args);
  }

  async clickMessage(...args) {
    this.transport.openMessage(...args);
  }

  on(...args) {
    this.transport.on(...args);
  }

  close() {
    this.transport.close();
  }
}

export {
  Userlist,

  NullTransport,
  WebsocketTransport,
  WidgetTransport,

  StaticTokenProvider,
  PromiseTokenProvider
};
