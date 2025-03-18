import { expect, use } from "chai";
import { createStubInstance } from "sinon";
import sinonChai from "sinon-chai";

use(sinonChai);

import Relation from "../src/relation";
import User from "../src/user";
import Client from "../src/client";

describe("Relation", function () {
  let resource = User;
  let scope = {};

  let relation;
  let client;

  beforeEach(function () {
    client = createStubInstance(Client);
    scope.client = client;

    relation = new Relation(scope, resource);
  });

  it("should throw the resource's validation errors", function () {
    expect(function () {
      relation.create();
    }).to.throw("Missing required attributes object");
  });

  describe("#create", function () {
    let client = createStubInstance(Client);

    beforeEach(function () {
      scope.client = client;
    });

    it("should post the resource using the scope's client", function () {
      relation.create({
        identifier: "1",
        name: "John",
        email: "john@userlist.com",
        properties: {
          foo: "bar",
          bar: "baz",
        },
      });

      expect(client.post).to.be.calledWithExactly(
        "/users",
        new User({
          identifier: "1",
          name: "John",
          email: "john@userlist.com",
          properties: {
            foo: "bar",
            bar: "baz",
          },
        })
      );
    });
  });

  describe("#push", function () {
    let client = createStubInstance(Client);

    beforeEach(function () {
      scope.client = client;
    });

    it("should post the resource using the scope's client", function () {
      relation.push({ identifier: "1" });

      expect(client.post).to.be.calledWithExactly(
        "/users",
        new User({ identifier: "1" })
      );
    });
  });

  describe("#update", function () {
    let client = createStubInstance(Client);

    beforeEach(function () {
      scope.client = client;
    });

    it("should post the resource using the scope's client", function () {
      relation.update({ identifier: "1" });

      expect(client.post).to.be.calledWithExactly(
        "/users",
        new User({ identifier: "1" })
      );
    });
  });

  describe("#delete", function () {
    it("should delete the resource using the scope's client", function () {
      relation.delete("1");

      expect(client.delete).to.be.calledWithExactly(
        "/users",
        new User({ identifier: "1" })
      );
    });

    it("should delete the resource using the scope's client", function () {
      relation.delete({ identifier: "1", name: "John" });

      expect(client.delete).to.be.calledWithExactly(
        "/users",
        new User({ identifier: "1", name: "John" })
      );
    });
  });

  describe("#normalize", function () {
    it("should normalize a string into a new user object with an identifier", function () {
      let normalized = relation.normalize("1");

      expect(normalized).to.be.eql(new User({ identifier: "1" }));
    });

    it("should normalize an object into a new user with it's properties", function () {
      let normalized = relation.normalize({ identifier: "1", name: "John" });

      expect(normalized).to.be.eql(new User({ identifier: "1", name: "John" }));
    });
  });
});
