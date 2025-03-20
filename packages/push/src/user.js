import Resource from './resource.js';

export default class User extends Resource {
  static get endpoint() {
    return '/users';
  }

  constructor(attributes) {
    if (typeof attributes === 'string') {
      attributes = { identifier: attributes };
    }

    if (attributes == null || typeof attributes !== 'object') {
      throw 'Missing required attributes object';
    }

    if (attributes.identifier == null && attributes.email == null) {
      throw 'Missing required attribute identifier or email';
    }

    super(attributes);
  }
}
