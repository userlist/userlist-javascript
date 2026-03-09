import https from 'https';

import Config from '../src/config';

function performRequest({ url, payload, ...options }) {
  options = {
    hostname: url.host,
    port: url.port !== '' ? url.port : 443,
    path: url.pathname,
    ...options,
  };

  return new Promise(function (resolve, reject) {
    let request = https.request(options, (response) => {
      resolve(response);
    });

    request.useChunkedEncodingByDefault = true;

    request.on('error', (error) => {
      reject(error);
    });

    if (payload) {
      request.write(JSON.stringify(payload));
    }

    request.end();
  });
}

export default class Client {
  constructor(config = {}) {
    this.config = new Config(config);

    this.agent = new https.Agent({ keepAlive: true });
  }

  get(endpoint) {
    return this._request('GET', endpoint);
  }

  put(endpoint, payload) {
    return this._request('PUT', endpoint, payload);
  }

  post(endpoint, payload) {
    return this._request('POST', endpoint, payload);
  }

  delete(endpoint, payload) {
    return this._request('DELETE', endpoint, payload);
  }

  _request(method, endpoint, payload) {
    let { pushEndpoint, pushKey } = this.config;
    let { agent } = this;

    let url = new URL(endpoint, pushEndpoint);
    let headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: `Push ${pushKey}`,
    };

    return performRequest({ method, url, headers, payload, agent });
  }
}
