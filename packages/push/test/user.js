import { expect } from 'chai';

import User from '../src/user';

describe('User', function() {
  describe('validations', function() {
    it('should require an attributes object', function() {
      expect(function() {
        new User();
      }).to.throw('Missing required attributes object');
    });

    it('should require an identifier', function() {
      expect(function() {
        new User({ email: 'foo@example.com' });
      }).to.throw('Missing required attribute identifier');
    });
  });

  describe('.endpoint', function() {
    it('should specify the correct endpoint', function() {
      expect(User.endpoint).to.eq('/users');
    });
  });
});
