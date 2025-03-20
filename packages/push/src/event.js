import Resource from './resource.js';

export default class Event extends Resource {
  static get endpoint() {
    return '/events';
  }

  constructor(attributes) {
    if (attributes == null || typeof attributes !== 'object') {
      throw 'Missing required attributes object';
    }

    if (attributes.user == null && attributes.company == null) {
      throw 'Missing required attribute user or company';
    }

    if (attributes.name == null) {
      throw 'Missing required attribute name';
    }

    super(attributes);
  }
}
