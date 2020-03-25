import { expect } from 'chai';

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

  it('should alias the users.create method as user', function() {
    expect(userlist.user).to.be.eq(userlist.users.create);
  });

  it('should alias the events.create method as event', function() {
    expect(userlist.event).to.be.eq(userlist.events.create);
  });

  it('should alias the companies.create method as company', function() {
    expect(userlist.company).to.be.eq(userlist.companies.create);
  });

  it('should alias the events.create method as track', function() {
    expect(userlist.track).to.be.eq(userlist.events.create);
  });

  it('should alias the users.create method as identify', function() {
    expect(userlist.identify).to.be.eq(userlist.users.create);
  });
});
