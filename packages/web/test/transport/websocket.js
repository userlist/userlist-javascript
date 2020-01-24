import { expect } from 'chai';
import { Server } from 'ws';
import EventEmitter from 'events';

import { WebsocketTransport } from '../../src/index';

class ActionCableMock extends EventEmitter {
  constructor() {
    super(...arguments);

    this.server = new Server({ port: 0 });
    this.server.on('connection', (socket) => {
      socket.on('message', (message) => {
        let payload = JSON.parse(message);

        if(payload.command == 'message') {
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

describe('WebsocketTransport', function() {
  let server, transport;

  beforeEach(function() {
    server = new ActionCableMock();
  });

  afterEach(function() {
    server.close();
    transport.close();
  });

  it('connects to the server', function(done) {
    server.on('connection', () => { done(); });

    transport = new WebsocketTransport(server.url);
  });

  it('subscribes to the correct channel server', function(done) {
    server.on('subscription', (payload) => {
      expect(payload.identifier).to.equal("{\"channel\":\"Widget::MessagingChannel\"}")
      done();
    });

    transport = new WebsocketTransport(server.url);
  });

  it('sends the identify call', function(done) {
    server.on('message', (payload, socket) => {
      expect(payload.data.action).to.equal('identify');
      expect(payload.data.email).to.equal('foo@example.com');
      expect(payload.data.properties).to.deep.equal({ foo: 42 });
      done();
    });

    transport = new WebsocketTransport(server.url);
    transport.identify('static-token', { email: 'foo@example.com', properties: { foo: 42 } });
  });

  it('sends the track call', function(done) {
    server.on('message', (payload, socket) => {
      expect(payload.data.action).to.equal('track');
      expect(payload.data.name).to.equal('event-name');
      expect(payload.data.properties).to.deep.equal({ foo: 42 });
      done();
    });

    transport = new WebsocketTransport(server.url);
    transport.track('static-token', 'event-name', { properties: { foo: 42 } });
  });
});
