import { expect } from 'chai';

import Company from '../src/company';

describe('Company', function () {
  describe('validations', function () {
    it('should require an attributes object', function () {
      expect(function () {
        new Company();
      }).to.throw('Missing required attributes object');
    });

    it('should require an identifier', function () {
      expect(function () {
        new Company({ name: 'Foo, Inc.' });
      }).to.throw('Missing required attribute identifier');
    });
  });

  describe('constructor', function () {
    it('should use a string argument as the identifier', function () {
      let company = new Company('company-identifier');

      expect(company.identifier).to.eq('company-identifier');
    });
  });

  describe('.endpoint', function () {
    it('should specify the correct endpoint', function () {
      expect(Company.endpoint).to.eq('/companies');
    });
  });
});
