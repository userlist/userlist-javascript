import { expect } from 'chai';

import { WebsocketTransport } from '../../src/index';
import ActionCableMock from '../support/action_cable_mock';

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

  it('receives data from the server', function(done) {
    server.on('subscription', (payload, socket) => {
      socket.send(JSON.stringify({ type: 'data', identifier: payload.identifier, message: JSON.stringify({ id: 'message-id' }) }));
    });

    transport = new WebsocketTransport(server.url);
    transport.on('message', (message) => {
      expect(message.id).to.equal('message-id');
      done();
    });
  });
});
