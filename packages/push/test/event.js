import { expect } from 'chai';

import Event from '../src/event.js';

describe('Event', function () {
  describe('validations', function () {
    it('should require an attributes object', function () {
      expect(function () {
        new Event();
      }).to.throw('Missing required attributes object');
    });

    it('should require an user or company', function () {
      expect(function () {
        new Event({ name: 'custom_event' });
      }).to.throw('Missing required attribute user or company');
    });

    it('should not throw an error when there is a user but no company', function () {
      expect(function () {
        new Event({ name: 'custom_event', user: '1' });
      }).to.not.throw('Missing required attribute user or company');
    });

    it('should not throw an error when there is no user but a company', function () {
      expect(function () {
        new Event({ name: 'custom_event', company: '1' });
      }).to.not.throw('Missing required attribute user or company');
    });

    it('should require an event name', function () {
      expect(function () {
        new Event({ user: '1' });
      }).to.throw('Missing required attribute name');
    });
  });

  describe('.endpoint', function () {
    it('should specify the correct endpoint', function () {
      expect(Event.endpoint).to.eq('/events');
    });
  });
});
