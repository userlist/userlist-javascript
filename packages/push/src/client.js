import http from 'http';
import https from 'https';

import Config from '../src/config.js';

function performRequest(method, url, headers, payload) {
  let isTLS = url.protocol === 'https:';
  let client = isTLS ? https : http;

  let options = {
    method,
    hostname: url.host,
    port: url.port !== '' ? url.port : isTLS ? 443 : 80,
    path: url.pathname,
    headers: headers,
  };

  return new Promise(function (resolve, reject) {
    let request = client.request(options, (response) => {
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

    let url = new URL(endpoint, pushEndpoint);
    let headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: `Push ${pushKey}`,
    };

    return performRequest(method, url, headers, payload);
  }
}
