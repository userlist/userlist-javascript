import Resource from './resource.js';

export default class Message extends Resource {
  static get endpoint() {
    return '/messages';
  }
}
