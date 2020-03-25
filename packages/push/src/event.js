import Resource from './resource';

export default class Event extends Resource {
  static get endpoint() {
    return '/events';
  }

  constructor(attributes) {
    if(attributes == null) {
      throw 'Missing required attributes object';
    }

    if(attributes.user == null) {
      throw 'Missing required attribute user';
    }

    if(attributes.name == null) {
      throw 'Missing required attribute name';
    }

    super(attributes);
  }
}
