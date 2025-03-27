# @userlist/web

This package helps with client side tracking for [Userlist](http://userlist.com).

> For server side tracking on Node.js, please use [@userlist/push](https://github.com/userlist/userlist-javascript/tree/main/packages/push).

## Installation

To install this package, use one of the commands corresponding to your package manager.

Via NPM:

```shell
npm install @userlist/web
```

Via Yarn:

```shell
yarn add @userlist/web
```

## Configuration

To initialize the Userlist client, you have to pass it a user token that you generate on your backend. For details on how to create a user token, please refer to the [documentation](https://userlist.com/docs/developers/in-app-messages/#generating-user-tokens).

```javascript
import Userlist from "@userlist/web";

// With a static token
const userlist = new Userlist("userlist-user-token");

// With a promise that retuns a token
const token = fetch("http://example.com/token")
  .then((response) => response.json())
  .then((data) => data.userlistToken);

const userlist = new Userlist(token);
```

## Usage

You can only update data of the user that the user token was generated for. To update other data, please use server side tracking.

### Tracking User Properties

To send user data into Userlist, use the `userlist.identify` method. This method will create a new user if the user doesn't exist yet, or update the existing user if it does. Properties that aren't present in the payload are ignored and remain unchanged.

```javascript
userlist.identify({
  email: user.email,
  properties: {
    first_name: user.first_name,
    last_name: user.last_name,
  },
});
```

### Tracking User Events

To track custom events use the `userlist.track` method. This method will create a new user if the user doesn't exist yet, or update the existing user if it does.

```javascript
userlist.track({
  name: "project_created",
  properties: {
    project_name: project.name,
  },
});
```

### Resetting

If you want to reset the connection to our services to be able to start tracking a new user, please call `destroy` before creating a new Userlist client.

```javascript
userlist.destroy();
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/userlist/userlist-javascript. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The package is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Code of Conduct

Everyone interacting in this project’s codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/userlist/userlist-javascript/blob/main/CODE_OF_CONDUCT.md).

## What is Userlist?

[![Userlist](https://userlist.com/images/external/userlist-logo-github.svg)](https://userlist.com/)

[Userlist](https://userlist.com/) allows you to onboard and engage your SaaS users with targeted behavior-based campaigns using email or in-app messages.

Userlist was started in 2017 as an alternative to bulky enterprise messaging tools. We believe that running SaaS products should be more enjoyable. Learn more [about us](https://userlist.com/about-us/).
