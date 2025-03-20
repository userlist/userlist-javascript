import Relation from './relation.js';
import Client from './client.js';
import Config from './config.js';

import User from './user.js';
import Company from './company.js';
import Relationship from './relationship.js';
import Event from './event.js';
import Message from './message.js';

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
