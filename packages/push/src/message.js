import Resource from "./resource";

export default class Message extends Resource {
  static get endpoint() {
    return "/messages";
  }
}
