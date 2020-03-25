import nock from 'nock';

import Client from '../src/client';

describe('Client', function() {
  let client, scope, pushKey = 'userlist-push-key';

  beforeEach(function() {
    nock.disableNetConnect();

    client = new Client({ pushKey });

    scope = nock('https://push.userlist.com')
      .matchHeader('Accept', 'application/json')
      .matchHeader('Content-Type', 'application/json; charset=UTF-8')
      .matchHeader('Authorization', `Push ${pushKey}`)
  });

  afterEach(function() {
    nock.cleanAll();
    nock.enableNetConnect();
  });

  describe('.get', function() {
    it('should send the correct request', async function() {
      scope.get('/users').reply(200, {});

      await client.get('/users');
    });
  });

  describe('.put', function() {
    it('should send the correct request', async function() {
      scope.put('/users', { identifier: 'node-identifier' }).reply(202);

      await client.put('/users', { identifier: 'node-identifier' });
    });
  });

  describe('.post', function() {
    it('should send the correct request', async function() {
      scope.post('/users', { identifier: 'node-identifier' }).reply(202);

      await client.post('/users', { identifier: 'node-identifier' });
    });
  });

  describe('.delete', function() {
    it('should send the correct request', async function() {
      scope.delete('/users/1').reply(202);

      await client.delete('/users/1');
    });
  });
});
