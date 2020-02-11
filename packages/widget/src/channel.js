import EventEmitter from './utils/event_emitter';

const INIT = 'userlist/init';

export default class Channel extends EventEmitter {
  static connect(element) {
    return new Promise((resolve) => {
      let outgoingChannel = new MessageChannel();
      let incomingChannel = new MessageChannel();

      let channel = new Channel(incomingChannel.port2, outgoingChannel.port1);

      channel.on('connect', () => resolve(channel));

      element.postMessage(INIT, '*', [outgoingChannel.port2, incomingChannel.port1]);
    });
  }

  static listen(element) {
    return new Promise((resolve) => {
      element.addEventListener('message', (event) => {
        if(event.data === INIT) {
          let [incoming, outgoing] = event.ports;
          let channel = new Channel(incoming, outgoing);
          channel.on('connect', () => resolve(channel));
        }
      })
    });
  }

  constructor(incoming, outgoing) {
    super();

    this.incoming = incoming;
    this.outgoing = outgoing;

    incoming.addEventListener('message', (event) => {
      let { type, payload } = event.data;
      this.emit(type, payload);
    });

    incoming.start();

    this.postMessage('connect');
  }

  postMessage(type, payload) {
    return this.outgoing.postMessage({ type, payload });
  }

  close() {
    this.incoming.close();
    this.outgoing.close();
  }
}
