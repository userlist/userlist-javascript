import Resource from './resource.js';

export default class Company extends Resource {
  static get endpoint() {
    return '/companies';
  }

  constructor(attributes) {
    if (typeof attributes === 'string') {
      attributes = { identifier: attributes };
    }

    if (attributes == null || typeof attributes !== 'object') {
      throw 'Missing required attributes object';
    }

    if (attributes.identifier == null) {
      throw 'Missing required attribute identifier';
    }

    super(attributes);
  }
}
