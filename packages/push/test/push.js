import { expect, use } from 'chai';
import { spy } from 'sinon';

import sinonChai from 'sinon-chai';

use(sinonChai);

import Userlist from '../src/push';
import Relation from '../src/relation';

import User from '../src/user';
import Event from '../src/event';
import Company from '../src/company';

describe('Userlist', function() {
  let userlist;

  beforeEach(function() {
    userlist = new Userlist();
  });

  it('should be a thing', function() {
    expect(userlist).to.be;
  });

  it('should have a users relation', function() {
    expect(userlist.users).to.be.an.instanceOf(Relation);
    expect(userlist.users.resource).to.eq(User);
  });

  it('should have a companies relation', function() {
    expect(userlist.companies).to.be.an.instanceOf(Relation);
    expect(userlist.companies.resource).to.eq(Company);
  });

  it('should have a events relation', function() {
    expect(userlist.events).to.be.an.instanceOf(Relation);
    expect(userlist.events.resource).to.eq(Event);
  });

  it('should delegate the user method to users.create', function() {
    userlist.users.create = spy();
    userlist.user({ identifier: 'user-identifier' });
    expect(userlist.users.create).calledOnceWith({ identifier: 'user-identifier' });
  });

  it('should delegate the event method to events.create', function() {
    userlist.events.create = spy();
    userlist.event({ name: 'custom_event', user: '1' });
    expect(userlist.events.create).calledOnceWith({ name: 'custom_event', user: '1' });
  });

  it('should delegate the company method to companies.create', function() {
    userlist.companies.create = spy();
    userlist.company({ identifier: 'company-identifier' });
    expect(userlist.companies.create).calledOnceWith({ identifier: 'company-identifier' });
  });

  it('should alias the event method as track', function() {
    expect(userlist.track).to.be.eq(userlist.event);
  });

  it('should alias the user method as identify', function() {
    expect(userlist.identify).to.be.eq(userlist.user);
  });
});
