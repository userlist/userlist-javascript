import { expect } from 'chai';

import { Channel } from '../src/index';
import EventEmitter from '../src/utils/event_emitter';

class MockWindow extends EventEmitter {
  postMessage(data, origin, ports) {
    this.emit('message', { data, origin, ports });
  }

  addEventListener(name, callback) {
    this.on(name, callback);
  }
}

describe('Channel', function () {
  let element, listeningChannel, connectingChannel;

  beforeEach(function () {
    element = new MockWindow();
  });

  afterEach(function () {
    listeningChannel.close();
    connectingChannel.close();
  });

  describe('.connect', function () {
    it('should wait until a connection is established', function (done) {
      Channel.listen(element).then((channel) => {
        listeningChannel = channel;
        channel.postMessage('successful');
      });

      Channel.connect(element).then((channel) => {
        connectingChannel = channel;
        channel.on('successful', () => {
          done();
        });
      });
    });
  });

  describe('.listen', function () {
    it('should wait until a connection is established', function (done) {
      Channel.listen(element).then((channel) => {
        listeningChannel = channel;
        channel.on('successful', () => {
          done();
        });
      });

      Channel.connect(element).then((channel) => {
        connectingChannel = channel;
        channel.postMessage('successful');
      });
    });
  });

  describe('#postMessage', function () {
    beforeEach(function () {
      return Promise.all([
        Channel.listen(element).then((channel) => {
          listeningChannel = channel;
        }),
        Channel.connect(element).then((channel) => {
          connectingChannel = channel;
        }),
      ]);
    });

    it('should send a message to the other side of the channel', function (done) {
      connectingChannel.on('message', (payload) => {
        expect(payload).to.equal('hello world');
        done();
      });

      listeningChannel.postMessage('message', 'hello world');
    });

    it('should send a message to the other side of the channel (vice versa)', function (done) {
      listeningChannel.on('message', (payload) => {
        expect(payload).to.equal('hello world');
        done();
      });

      connectingChannel.postMessage('message', 'hello world');
    });
  });
});
