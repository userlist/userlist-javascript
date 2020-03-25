# `@userlist/push`

Wrapper for the Userlist server side push API.

## Usage

```javascript
const Userlist = require('@userlist/push');

var userlist = new Userlist();

// Sending user data
userlist.users.create({
  identifier: '1',
  email: 'foo@example.com',
  properties: {
    first_name: 'Foo',
    last_name: 'Bar'
  }
});

// Tracking events
userlist.events.create({
  name: 'project_created',
  user: '1'
});

// Deleting
userlist.users.delete('1');
```
