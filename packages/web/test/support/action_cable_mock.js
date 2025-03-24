import { WebSocketServer } from 'ws';

import EventEmitter from '../../src/utils/event_emitter';

export default class ActionCableMock extends EventEmitter {
  constructor() {
    super(...arguments);

    this.server = new WebSocketServer({ port: 0 });
    this.server.on('connection', (socket) => {
      socket.on('message', (message) => {
        let payload = JSON.parse(message);

        if (payload.command == 'message') {
          payload.data = JSON.parse(payload.data);
          this.emit('message', payload, socket);
        } else if (payload.command == 'subscribe') {
          socket.send(JSON.stringify({ type: 'confirm_subscription', identifier: payload.identifier }));
          this.emit('subscription', payload, socket);
        }
      });

      socket.send('{"type":"welcome"}');
      this.emit('connection', socket);
    });
  }

  close(callback) {
    this.server.close(callback);
  }

  get url() {
    return `ws://localhost:${this.server.address().port}`;
  }
}
