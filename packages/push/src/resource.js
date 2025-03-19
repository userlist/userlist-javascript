export default class Resource {
  constructor(attributes = {}) {
    if (attributes == null || typeof attributes !== 'object') {
      throw 'Missing required attributes object';
    }

    Object.assign(this, attributes);
  }
}
