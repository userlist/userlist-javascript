export default class StaticTokenProvider {
  constructor(token) {
    this._token = token;
  }

  async receiveToken() {
    return this._token;
  }
}
