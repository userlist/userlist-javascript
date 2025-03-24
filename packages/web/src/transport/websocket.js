import { createConsumer } from '@rails/actioncable';

import EventEmitter from '../utils/event_emitter';
import { extractMessageId } from '../utils/message';

export default class WebsocketTransport extends EventEmitter {
  constructor(tokenProvider, endpoint = 'wss://api.widget.userlist.com/cable') {
    super();

    this._tokenProvider = tokenProvider;
    this._queue = [];
    this._consumer = createConsumer(endpoint);
    this._connection = this._consumer.connection;

    this._createSubscription();
  }

  async identify(properties = {}) {
    this._perform('identify', properties);
  }

  async track(name, properties = {}) {
    this._perform('track', { properties, name });
  }

  async openMessage(message) {
    this._perform('open_message', { message_id: extractMessageId(message) });
  }

  async closeMessage(message) {
    this._perform('close_message', { message_id: extractMessageId(message) });
  }

  async clickMessage(message, url) {
    this._perform('click_message', { message_id: extractMessageId(message), url });
  }

  close() {
    this._connection.close({ allowReconnect: false });
  }

  _createSubscription() {
    return (this._subscription =
      this._subscription ||
      (async () => {
        let consumer = this._consumer;
        let queue = this._queue;
        let transport = this;
        let params = {
          channel: 'Widget::MessagingChannel',
          token: await this._tokenProvider.receiveToken(),
        };

        let subscription = consumer.subscriptions.create(params, {
          connected() {
            while (queue.length > 0) {
              this.send(queue.shift());
            }
          },

          received(payload) {
            let type = payload && payload.data && payload.data.type;

            if (type === 'messages') {
              transport.emit('message', payload);
            } else if (type === 'configurations') {
              transport.emit('config', payload);
            } else {
              transport.emit('data', payload);
            }
          },
        });

        return subscription;
      })());
  }

  async _perform(action, data) {
    let subscription = await this._createSubscription();

    if (this._connection.isOpen()) {
      subscription.perform(action, data);
    } else {
      this._queue.push({ ...data, action });
    }
  }
}
