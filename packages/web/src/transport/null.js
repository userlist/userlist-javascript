import EventEmitter from '../utils/event_emitter';

export default class NullTransport extends EventEmitter {
  async identify() {}
  async track() {}
  close() {}
}
