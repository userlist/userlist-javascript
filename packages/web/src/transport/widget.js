import EventEmitter from '../utils/event_emitter.js';
import { extractMessageId } from '../utils/message.js';

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

  async openMessage(message) {
    this._perform('open_message', { message_id: extractMessageId(message) });
  }

  async closeMessage(message) {
    this._perform('close_message', { message_id: extractMessageId(message) });
  }

  async clickMessage(message, url) {
    this._perform('click_message', { message_id: extractMessageId(message), url });
  }

  close() {}

  async _perform(action, data) {
    let channel = await this.widget.connectChannel();
    channel.postMessage(action, data);
  }
}
