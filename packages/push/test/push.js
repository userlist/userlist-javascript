import { expect, use } from 'chai';
import { spy } from 'sinon';

import sinonChai from 'sinon-chai';

use(sinonChai);

import Userlist from '../src/push';
import Relation from '../src/relation';

import User from '../src/user';
import Event from '../src/event';
import Company from '../src/company';
import Relationship from '../src/relationship';
import Message from '../src/message';

describe('Userlist', function () {
  let userlist;

  beforeEach(function () {
    userlist = new Userlist();
  });

  it('should be a thing', function () {
    expect(userlist).to.be;
  });

  it('should have a users relation', function () {
    expect(userlist.users).to.be.an.instanceOf(Relation);
    expect(userlist.users.resource).to.eq(User);
  });

  it('should have a companies relation', function () {
    expect(userlist.companies).to.be.an.instanceOf(Relation);
    expect(userlist.companies.resource).to.eq(Company);
  });

  it('should have a events relation', function () {
    expect(userlist.events).to.be.an.instanceOf(Relation);
    expect(userlist.events.resource).to.eq(Event);
  });

  it('should have a relationships relation', function () {
    expect(userlist.relationships).to.be.an.instanceOf(Relation);
    expect(userlist.relationships.resource).to.eq(Relationship);
  });

  it('should have a messages relation', function () {
    expect(userlist.messages).to.be.an.instanceOf(Relation);
    expect(userlist.messages.resource).to.eq(Message);
  });

  it('should delegate the user method to users.push', function () {
    userlist.users.push = spy();
    userlist.user({ identifier: 'user-identifier' });
    expect(userlist.users.push).calledOnceWith({
      identifier: 'user-identifier',
    });
  });

  it('should delegate the event method to events.push', function () {
    userlist.events.push = spy();
    userlist.event({ name: 'custom_event', user: '1' });
    expect(userlist.events.push).calledOnceWith({
      name: 'custom_event',
      user: '1',
    });
  });

  it('should delegate the company method to companies.push', function () {
    userlist.companies.push = spy();
    userlist.company({ identifier: 'company-identifier' });
    expect(userlist.companies.push).calledOnceWith({
      identifier: 'company-identifier',
    });
  });

  it('should delegate the relationship method to relationships.push', function () {
    userlist.relationships.push = spy();
    userlist.relationship({ user: 'user-1', company: 'company-1' });
    expect(userlist.relationships.push).calledOnceWith({
      user: 'user-1',
      company: 'company-1',
    });
  });

  it('should delegate the message method to messages.push', function () {
    userlist.messages.push = spy();
    userlist.message({
      user: 'user-1',
      template: 'welcome',
      properties: { name: 'John' },
    });
    expect(userlist.messages.push).calledOnceWith({
      user: 'user-1',
      template: 'welcome',
      properties: { name: 'John' },
    });
  });

  it('should alias the event method as track', function () {
    expect(userlist.track).to.be.eq(userlist.event);
  });

  it('should alias the user method as identify', function () {
    expect(userlist.identify).to.be.eq(userlist.user);
  });
});
