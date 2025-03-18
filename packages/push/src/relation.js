export default class Relation {
  constructor(scope, resource) {
    this.scope = scope;
    this.resource = resource;
  }

  push(attributes) {
    return this.client.post(this.endpoint, this.normalize(attributes));
  }

  create() {
    return this.push(...arguments);
  }

  update() {
    return this.push(...arguments);
  }

  delete(attributes) {
    return this.client.delete(this.endpoint, this.normalize(attributes));
  }

  normalize(attributes) {
    if (typeof attributes === "string") {
      attributes = { identifier: attributes };
    }

    return new this.resource(attributes);
  }

  get client() {
    return this.scope.client;
  }

  get endpoint() {
    return this.resource.endpoint;
  }
}
