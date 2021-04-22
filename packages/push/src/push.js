import Relation from './relation';
import Client from './client';
import Config from './config';

import User from './user';
import Company from './company';
import Event from './event';

export default class Userlist {
  constructor(config = {}) {
    this.config = new Config(config);
    this.client = new Client(this.config);

    this.users = new Relation(this, User);
    this.companies = new Relation(this, Company);
    this.events = new Relation(this, Event);

    this.identify = this.user;
    this.track = this.event;
  }

  user(...args) { return this.users.create(...args); }
  company(...args) { return this.companies.create(...args); }
  event(...args) { return this.events.create(...args); }
}
