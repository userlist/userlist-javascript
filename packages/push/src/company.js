import Resource from './resource';

export default class Company extends Resource {
  static get endpoint() {
    return '/companies';
  }

constructor(attributes) {
    if(attributes == null) {
      throw 'Missing required attributes object';
    }

    if(attributes.identifier == null) {
      throw 'Missing required attribute identifier';
    }

    super(attributes);
  }
}
