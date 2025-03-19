import { expect } from "chai";

import User from "../src/user";

describe("User", function () {
  describe("validations", function () {
    it("should require an attributes object", function () {
      expect(function () {
        new User();
      }).to.throw("Missing required attributes object");
    });

    it("should require an identifier or email address", function () {
      expect(function () {
        new User({});
      }).to.throw("Missing required attribute identifier or email");
    });

    it("should not raise an error when there is an identifier but no email address", function () {
      expect(function () {
        new User({ identifier: "user-identifier" });
      }).to.not.throw("Missing required attribute identifier or email");
    });

    it("should not raise an error when there is no identifier but an email address", function () {
      expect(function () {
        new User({ email: "test@example.com" });
      }).to.not.throw("Missing required attribute identifier or email");
    });
  });

  describe("constructor", function () {
    it("should use a string argument as the identifier", function () {
      let user = new User("user-identifier");

      expect(user.identifier).to.eq("user-identifier");
    });
  });

  describe(".endpoint", function () {
    it("should specify the correct endpoint", function () {
      expect(User.endpoint).to.eq("/users");
    });
  });
});
