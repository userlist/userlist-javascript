import { createConsumer } from '@rails/actioncable';

export default class WebsocketTransport {
  constructor(endpoint = 'wss://api.widget.userlist.com/cable') {
    let consumer = createConsumer(endpoint);
    let queue = [];
    let transport = this;

    let subscription = consumer.subscriptions.create('Widget::MessagingChannel', {
      connected() {
        while(queue.length > 0) {
          this.send(queue.shift());
        }
      }
    });

    this._queue = queue;
    this._consumer = consumer;
    this._connection = consumer.connection;
    this._subscription = subscription;
  }

  identify(token, attributes = {}) {
    this._perform('identify', { ...attributes, token });
  }

  track(token, name, attributes = {}) {
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
