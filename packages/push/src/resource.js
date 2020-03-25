export default class Resource {
  constructor(attributes = {}) {
    for(let attribute in attributes) {
      this[attribute] = attributes[attribute];
    }
  }
}
