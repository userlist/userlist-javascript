var WebSocket = require('ws');

class WebSocketWithOrigin extends WebSocket {
  constructor(address, protocols, options = {}) {
    options.origin = 'https://localhost:4300';
    super(address, protocols, options);
  }
}

if(global.self === undefined) {
  global.self = {
    console: console,
    WebSocket: WebSocketWithOrigin
  };
}

if(global.addEventListener === undefined) {
  global.addEventListener = function() {};
}

if(global.removeEventListener === undefined) {
  global.removeEventListener = function() {};
}
