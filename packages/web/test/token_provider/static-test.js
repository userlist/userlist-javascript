import { expect } from 'chai';

import { StaticTokenProvider } from '../../src/index';

describe('StaticTokenProvider', function () {
  describe('#receiveToken', function () {
    let provider = new StaticTokenProvider('static-token');

    it('returns the given token', async function () {
      let token = await provider.receiveToken();

      expect(token).to.equal('static-token');
    });
  });
});
