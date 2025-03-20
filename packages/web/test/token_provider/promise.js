import { expect } from 'chai';

import { PromiseTokenProvider } from '../../src/index.js';

describe('PromiseTokenProvider', function () {
  describe('#receiveToken', function () {
    let promise = new Promise((resolve) => resolve('promise-token'));
    let provider = new PromiseTokenProvider(promise);

    it('returns the given token', async function () {
      let token = await provider.receiveToken();

      expect(token).to.equal('promise-token');
    });
  });
});
