# @userlist/push

This package helps with integrating [Userlist](http://userlist.com) into Node.js applications for _server side tracking_.

> For client side tracking, please use [@userlist/web](https://github.com/userlist/userlist-javascript/tree/master/packages/web).

## Installation

To install this package, use one of the commands corresponding to your package manager.

Via NPM:

```bash
npm install @userlist/push
```

Via Yarn:

```bash
yarn add @userlist/push
```

## Configuration

The only required configuration is the Push API key. You can get your Push API key via the [Push API settings](https://app.userlist.com/settings/push) in your Userlist account.

Configuration values can either be set via the constructor or as environment variables. The environment take precedence over configuration values from the constructor.

Configuration via environment variables:

```shell
USERLIST_PUSH_KEY=401e5c498be718c0a38b7da7f1ce5b409c56132a49246c435ee296e07bf2be39
```

Configuration via an constructor:

```javascript
var Userlist = require('@userlist/push');

var userlist = new Userlist({ pushKey: '401e5c498be718c0a38b7da7f1ce5b409c56132a49246c435ee296e07bf2be39' });
```

## Usage

### Tracking Users

To manually send user data into Userlist, use the `userlist.users.create` method.

```javascript
var userlist = new Userlist();

userlist.users.create({
  identifier: user.id,
  email: user.email,
  properties: {
    first_name: user.first_name,
    last_name: user.last_name
  }
});
```

It's also possible to delete a user from Userlist, using the `userlist.users.delete` method.

```javascript
userlist.users.delete(user.id)
```

### Tracking Events

To track custom events use the `userlist.events.create` method.

```javascript
var userlist = new Userlist();

userlist.events.create({
  name: 'project_created',
  user: user.id,
  properties: {
    project_name: project.name
  }
})
```


## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/userlist/userlist-javascript. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The package is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Code of Conduct

Everyone interacting in this project’s codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/userlist/userlist-javascript/blob/master/CODE_OF_CONDUCT.md).

## What is Userlist?

[![Userlist](https://userlist.com/images/external/userlist-logo-github.svg)](https://userlist.com/)

[Userlist](https://userlist.com/) allows you to onboard and engage your SaaS users with targeted behavior-based campaigns using email or in-app messages.

Userlist was started in 2017 as an alternative to bulky enterprise messaging tools. We believe that running SaaS products should be more enjoyable. Learn more [about us](https://userlist.com/about-us/).
