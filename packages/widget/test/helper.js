var WorkerThreads = require('worker_threads');

if(global.MessageChannel === undefined) {
  global.MessageChannel = WorkerThreads.MessageChannel;
  global.MessagePort = WorkerThreads.MessagePort;

  global.MessagePort.prototype.addEventListener = function(name, callback) {
    this.on('message', (data) => { callback({ data }) });
  }
}
