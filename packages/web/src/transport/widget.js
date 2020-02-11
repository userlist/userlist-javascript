import EventEmitter from '../utils/event_emitter';

export default class WidgetTransport extends EventEmitter {
  constructor(widget) {
    super();

    this.widget = widget;
  }

  async identify(attributes) {
    this._perform('identify', [attributes]);
  }

  async track(name, attributes) {
    this._perform('track', [name, attributes]);
  }

  close() {}

  async _perform(action, data) {
    let channel = await this.widget.connectChannel();
    channel.postMessage(action, data);
  }
}
