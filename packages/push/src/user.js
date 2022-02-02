import Resource from './resource';

export default class User extends Resource {
  static get endpoint() {
    return '/users';
  }

  constructor(attributes) {
    if(attributes == null) {
      throw 'Missing required attributes object';
    }

    if(attributes.identifier == null && attributes.email == null) {
      throw 'Missing required attribute identifier or email';
    }

    super(attributes);
  }
}
