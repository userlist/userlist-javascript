import EventEmitter from '../utils/event_emitter';

import { createConsumer } from '@rails/actioncable';

export default class WebsocketTransport extends EventEmitter {
  constructor(tokenProvider, endpoint = 'wss://api.widget.userlist.com/cable') {
    super();

    let consumer = createConsumer(endpoint);
    let queue = [];
    let transport = this;

    let subscription = consumer.subscriptions.create('Widget::MessagingChannel', {
      connected() {
        while(queue.length > 0) {
          this.send(queue.shift());
        }
      },

      received(data) {
        transport.emit('message', data)
      }
    });

    this._tokenProvider = tokenProvider;
    this._queue = queue;
    this._connection = consumer.connection;
    this._subscription = subscription;
  }

  async identify(attributes = {}) {
    let token = await this._tokenProvider.receiveToken();
    this._perform('identify', { ...attributes, token });
  }

  async track(name, attributes = {}) {
    let token = await this._tokenProvider.receiveToken();
    this._perform('track', { ...attributes, name, token });
  }

  close() {
    this._connection.close({ allowReconnect: false });
  }

  _perform(action, data) {
    if(this._connection.isOpen()) {
      this._subscription.perform(action, data);
    } else {
      this._queue.push({ ...data, action });
    }
  }
}
