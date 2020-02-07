export default class PromiseTokenProvider {
  constructor(promise) {
    this._promise = promise;
  }

  async receiveToken() {
    return await this._promise;
  }
}
