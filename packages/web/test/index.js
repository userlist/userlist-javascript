import { expect, use } from 'chai';
import { createStubInstance } from 'sinon';
import sinonChai from 'sinon-chai';

use(sinonChai);

import { Userlist, NullTransport, WidgetTransport, StaticTokenProvider } from '../src/index.js';

describe('Userlist', function () {
  let transport, userlist, tokenProvider;

  beforeEach(function () {
    transport = createStubInstance(NullTransport);
    tokenProvider = new StaticTokenProvider('token');
    userlist = new Userlist({ transport, tokenProvider });
  });

  afterEach(function () {
    userlist.close();
  });

  describe('constructor', function () {
    beforeEach(function () {
      userlist = new Userlist('static-token');
    });

    it('should use a default transport', function () {
      expect(userlist.transport).to.be.instanceof(WidgetTransport);
    });

    it('should use a default token provider', function () {
      expect(userlist.tokenProvider).to.be.instanceof(StaticTokenProvider);
    });

    it('should use the given token', async function () {
      let token = await userlist.tokenProvider.receiveToken();

      expect(token).to.equal('static-token');
    });
  });

  describe('#identify', function () {
    it('should transmit the given properties', async function () {
      await userlist.identify();
      expect(transport.identify).calledOnce;
    });
  });

  describe('#track', function () {
    it('should transmit the given properties', async function () {
      await userlist.track();
      expect(transport.track).calledOnce;
    });
  });
});
