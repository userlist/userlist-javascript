import EventEmitter from '../utils/event_emitter';

import { createConsumer } from '@rails/actioncable';

export default class WebsocketTransport extends EventEmitter {
  constructor(tokenProvider, endpoint = 'wss://api.widget.userlist.com/cable') {
    super();

    this._tokenProvider = tokenProvider;
    this._queue = [];
    this._consumer = createConsumer(endpoint);
    this._connection = this._consumer.connection;

    this._createSubscription();
  }

  async identify(attributes = {}) {
    this._perform('identify', { ...attributes });
  }

  async track(name, attributes = {}) {
    this._perform('track', { ...attributes, name });
  }

  close() {
    this._connection.close({ allowReconnect: false });
  }

  _createSubscription() {
    return this._subscription = this._subscription || (async () => {
      let consumer = this._consumer;
      let queue = this._queue;
      let transport = this;
      let params = {
        channel: 'Widget::MessagingChannel',
        token: await this._tokenProvider.receiveToken(),
      };

      let subscription = consumer.subscriptions.create(params, {
        connected() {
          while(queue.length > 0) {
            this.send(queue.shift());
          }
        },

        received(data) {
          transport.emit('message', data)
        }
      });

      return subscription;
    })();
  }

  async _perform(action, data) {
    let subscription = await this._createSubscription();

    if(this._connection.isOpen()) {
      subscription.perform(action, data);
    } else {
      this._queue.push({ ...data, action });
    }
  }
}
