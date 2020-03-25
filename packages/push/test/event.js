import { expect } from 'chai';

import Event from '../src/event';

describe('Event', function() {
  describe('validations', function() {
    it('should require an attributes object', function() {
      expect(function() {
        new Event();
      }).to.throw('Missing required attributes object');
    });

    it('should require an user', function() {
      expect(function() {
        new Event({ name: 'custom_event' });
      }).to.throw('Missing required attribute user');
    });

    it('should require an event name', function() {
      expect(function() {
        new Event({ user: '1' });
      }).to.throw('Missing required attribute name');
    });
  });

  describe('.endpoint', function() {
    it('should specify the correct endpoint', function() {
      expect(Event.endpoint).to.eq('/events');
    });
  });
});
