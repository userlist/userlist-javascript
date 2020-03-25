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

    this.user = this.users.create;
    this.company = this.companies.create;
    this.event = this.events.create;

    this.identify = this.user;
    this.track = this.event;
  }
}
