import { expect } from 'chai';

import { WebsocketTransport, StaticTokenProvider } from '../../src/index.js';
import ActionCableMock from '../support/action_cable_mock.js';

describe('WebsocketTransport', function () {
  let server, transport, tokenProvider;

  beforeEach(function () {
    server = new ActionCableMock();
    tokenProvider = new StaticTokenProvider('static-token');
  });

  afterEach(function () {
    server.close();
    transport.close();
  });

  it('connects to the server', function (done) {
    server.on('connection', () => {
      done();
    });

    transport = new WebsocketTransport(tokenProvider, server.url);
  });

  it('subscribes to the correct channel server', function (done) {
    server.on('subscription', (payload) => {
      expect(payload.identifier).to.equal('{"channel":"Widget::MessagingChannel","token":"static-token"}');
      done();
    });

    transport = new WebsocketTransport(tokenProvider, server.url);
  });

  it('sends the identify call', function (done) {
    server.on('message', (payload) => {
      expect(payload.data.action).to.equal('identify');
      expect(payload.data.email).to.equal('foo@example.com');
      expect(payload.data.properties).to.deep.equal({ foo: 42 });
      done();
    });

    transport = new WebsocketTransport(tokenProvider, server.url);
    transport.identify({ email: 'foo@example.com', properties: { foo: 42 } });
  });

  it('sends the track call', function (done) {
    server.on('message', (payload) => {
      expect(payload.data.action).to.equal('track');
      expect(payload.data.name).to.equal('event-name');
      expect(payload.data.properties).to.deep.equal({ foo: 42 });
      done();
    });

    transport = new WebsocketTransport(tokenProvider, server.url);
    transport.track('event-name', { foo: 42 });
  });

  it('receives messages from the server', function (done) {
    server.on('subscription', (payload, socket) => {
      socket.send(
        JSON.stringify({ identifier: payload.identifier, message: { data: { type: 'messages', id: 'message-id' } } })
      );
    });

    transport = new WebsocketTransport(tokenProvider, server.url);
    transport.on('message', (payload) => {
      expect(payload.data.id).to.equal('message-id');
      done();
    });
  });

  it('receives config from the server', function (done) {
    server.on('subscription', (payload, socket) => {
      socket.send(
        JSON.stringify({
          identifier: payload.identifier,
          message: { data: { type: 'configurations', id: 'config-id' } },
        })
      );
    });

    transport = new WebsocketTransport(tokenProvider, server.url);
    transport.on('config', (payload) => {
      expect(payload.data.id).to.equal('config-id');
      done();
    });
  });

  it('receives data from the server', function (done) {
    server.on('subscription', (payload, socket) => {
      socket.send(JSON.stringify({ identifier: payload.identifier, message: { foo: 'bar' } }));
    });

    transport = new WebsocketTransport(tokenProvider, server.url);
    transport.on('data', (payload) => {
      expect(payload.foo).to.equal('bar');
      done();
    });
  });
});
