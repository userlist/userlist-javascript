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
import Userlist from "@userlist/push";

const userlist = new Userlist({
  pushKey: "401e5c498be718c0a38b7da7f1ce5b409c56132a49246c435ee296e07bf2be39",
});
```

## Usage

### Tracking Users

To send user data into Userlist, use the `userlist.users.push` method. This method will create a new user if the user doesn't exist yet, or update the existing user if it does. Properties that aren't present in the payload are ignored and remain unchanged.

```javascript
userlist.users.push({
  identifier: user.id,
  email: user.email,
  properties: {
    first_name: user.first_name,
    last_name: user.last_name,
  },
});
```

It's also possible to delete a user from Userlist, using the `userlist.users.delete` method.

```javascript
userlist.users.delete({ identifier: user.id, email: user.email });
```

### Tracking Companies

To send company data into Userlist, use the `userlist.companies.push` method. This method will create a new company if the company doesn't exist yet, or update the existing company if it does. Properties that aren't present in the payload are ignored and remain unchanged.

```javascript
userlist.companies.push({
  identifier: company.id,
  name: company.name,
  properties: {
    plan: company.plan,
    trial_ends_at: company.trial_ends_at,
  },
});
```

It's also possible to delete a company from Userlist, using the `userlist.companies.delete` method.

```javascript
userlist.companies.delete({ identifier: company.id });
```

### Tracking Relationships

To create or update relationships between users and companies, use the `userlist.relationships.push` method. You need to specify both the user and company identifiers.

```javascript
userlist.relationships.push({
  user: user.id,
  company: company.id,
  properties: {
    role: "admin",
  },
});
```

It's also possible to delete a relationship using the `userlist.relationships.delete` method.

```javascript
userlist.relationships.delete({
  user: user.id,
  company: company.id,
});
```

### Tracking Events

To track custom events use the `userlist.events.push` method.

```javascript
userlist.events.push({
  name: "project_created",
  user: user.id,
  properties: {
    project_name: project.name,
  },
});
```

### Sending Messages

To send messages to your users, use the `userlist.messages.push` method. You can specify the user, template name, and any properties needed for the message template.

```javascript
userlist.messages.push({
  user: user.id,
  template: "welcome_message",
  properties: {
    project_name: project.name,
  },
});
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
