import { expect, use } from 'chai';
import { createStubInstance } from 'sinon';
import sinonChai from 'sinon-chai';

use(sinonChai);

import Relation from '../src/relation';
import User from '../src/user';
import Client from '../src/client';

describe('Relation', function() {
  let resource = User;
  let scope = {};

  let relation;
  let client;

  beforeEach(function() {
    client = createStubInstance(Client);
    scope.client = client;

    relation = new Relation(scope, resource);
  });

  it('should throw the resource\'s validation errors', function() {
    expect(function() {
      relation.create();
    }).to.throw('Missing required attributes object')
  });

  describe('#create', function() {
    let client = createStubInstance(Client);

    beforeEach(function() {
      scope.client = client;
    });

    it('should post the resource using the scope\'s client', function () {
      relation.create({ identifier: '1' });

      expect(client.post).to.be.calledWithExactly('/users', new User({ identifier: '1' }));
    });
  });

  describe('#delete', function() {
    it('should delete the resource using the scope\'s client', function () {
      relation.delete('1');

      expect(client.delete).to.be.calledWithExactly('/users/1');
    });
  });
});
