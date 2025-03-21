import Resource from './resource';

export default class Relationship extends Resource {
  static get endpoint() {
    return '/relationships';
  }

  constructor(attributes) {
    if (attributes == null || typeof attributes !== 'object') {
      throw 'Missing required attributes object';
    }

    if (attributes.user == null) {
      throw 'Missing required attribute user';
    }

    if (attributes.company == null) {
      throw 'Missing required attribute company';
    }

    super(attributes);
  }
}
