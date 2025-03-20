import EventEmitter from '../utils/event_emitter.js';

export default class NullTransport extends EventEmitter {
  async identify() {}
  async track() {}
  async openMessage() {}
  async closeMessage() {}
  async clickMessage() {}
  close() {}
}
