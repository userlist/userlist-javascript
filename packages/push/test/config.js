import { expect } from 'chai';

import Config from '../src/config';

describe('Config', function() {
  let env;

  beforeEach(function() {
    env = Object.assign({}, process.env);
  });

  afterEach(function() {
    process.env = Object.assign({}, env);
  });

  describe('.pushKey', function() {
    it('should have a default value', function() {
      let config = new Config();
      expect(config.pushKey).to.eq(null);
    });

    it('should accept values via the constructor', function() {
      let config = new Config({ pushKey: 'constructor-push-key' });
      expect(config.pushKey).to.eq('constructor-push-key');
    });

    it('should accept values from the ENV', function() {
      process.env['USERLIST_PUSH_KEY'] = 'environment-push-key';
      let config = new Config();
      expect(config.pushKey).to.eq('environment-push-key');
    });

    it('should accept values via a setter', function() {
      let config = new Config();
      config.pushKey = 'setter-push-key';
      expect(config.pushKey).to.eq('setter-push-key');
    });
  });

  describe('.pushEndpoint', function() {
    it('should have a default value', function() {
      let config = new Config();
      expect(config.pushEndpoint).to.eq('https://push.userlist.com');
    });

    it('should accept values via the constructor', function() {
      let config = new Config({ pushEndpoint: 'constructor-push-endpoint' });
      expect(config.pushEndpoint).to.eq('constructor-push-endpoint');
    });

    it('should accept values from the ENV', function() {
      process.env['USERLIST_PUSH_ENDPOINT'] = 'environment-push-endpoint';
      let config = new Config();
      expect(config.pushEndpoint).to.eq('environment-push-endpoint');
    });

    it('should accept values via a setter', function() {
      let config = new Config();
      config.pushEndpoint = 'setter-push-endpoint';
      expect(config.pushEndpoint).to.eq('setter-push-endpoint');
    });
  });
});
