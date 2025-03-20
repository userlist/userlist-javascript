import { expect } from 'chai';

import Relationship from '../src/relationship.js';

describe('Relationship', function () {
  describe('validations', function () {
    it('should require an attributes object', function () {
      expect(function () {
        new Relationship();
      }).to.throw('Missing required attributes object');
    });

    it('should require a user', function () {
      expect(function () {
        new Relationship({ company: 'company-1' });
      }).to.throw('Missing required attribute user');
    });

    it('should require a company', function () {
      expect(function () {
        new Relationship({ user: 'user-1' });
      }).to.throw('Missing required attribute company');
    });
  });

  describe('.endpoint', function () {
    it('should specify the correct endpoint', function () {
      expect(Relationship.endpoint).to.eq('/relationships');
    });
  });
});
