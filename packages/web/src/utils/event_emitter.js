export default class EventEmitter {
  constructor() {
    this._callbacks = {};
  }

  on(eventName, callback) {
    if(!this._callbacks[eventName]) {
      this._callbacks[eventName] = [];
    }

    this._callbacks[eventName].push(callback);
  }

  emit(eventName, ...args) {
    let callbacks = this._callbacks[eventName];

    if(callbacks) {
      for(let callback of callbacks) {
        callback(...args);
      }
    }
  }
}
