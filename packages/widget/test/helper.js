import { MessageChannel, MessagePort } from 'worker_threads';

if (global.MessageChannel === undefined) {
  global.MessageChannel = MessageChannel;
  global.MessagePort = MessagePort;
}
