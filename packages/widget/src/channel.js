import EventEmitter from './utils/event_emitter';

const INIT = 'userlist/init';

export default class Channel extends EventEmitter {
  static connect(element) {
    return new Promise((resolve) => {
      let messageChannel = new MessageChannel();

      let channel = new Channel(messageChannel.port1);
      channel.on('connect', () => resolve(channel));

      element.postMessage(INIT, '*', [messageChannel.port2]);
    });
  }

  static listen(element) {
    return new Promise((resolve) => {
      element.addEventListener('message', (event) => {
        if (event.data === INIT) {
          let channel = new Channel(event.ports[0]);
          channel.on('connect', () => resolve(channel));
        }
      });
    });
  }

  constructor(port) {
    super();

    this.port = port;

    port.addEventListener('message', (event) => {
      let { type, payload } = event.data;
      this.emit(type, payload);
    });

    port.start();

    this.postMessage('connect');
  }

  postMessage(type, payload) {
    return this.port.postMessage({ type, payload });
  }

  close() {
    this.port.close();
  }
}
