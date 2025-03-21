import Relation from './relation';
import Client from './client';
import Config from './config';

import User from './user';
import Company from './company';
import Relationship from './relationship';
import Event from './event';
import Message from './message';

export default class Userlist {
  constructor(config = {}) {
    this.config = new Config(config);
    this.client = new Client(this.config);

    this.users = new Relation(this, User);
    this.companies = new Relation(this, Company);
    this.relationships = new Relation(this, Relationship);
    this.events = new Relation(this, Event);
    this.messages = new Relation(this, Message);

    this.identify = this.user;
    this.track = this.event;
  }

  user() {
    return this.users.push(...arguments);
  }

  company() {
    return this.companies.push(...arguments);
  }

  relationship() {
    return this.relationships.push(...arguments);
  }

  event() {
    return this.events.push(...arguments);
  }

  message() {
    return this.messages.push(...arguments);
  }
}
