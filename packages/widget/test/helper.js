var WorkerThreads = require('worker_threads');

if(global.MessageChannel === undefined) {
  global.MessageChannel = WorkerThreads.MessageChannel;
  global.MessagePort = WorkerThreads.MessagePort;
}
