export function extractMessageId(message) {
  if(typeof message === 'string') {
    return message;
  } else if(typeof message === 'object') {
    if(message.id) {
      return message.id;
    } else if(message.data.id) {
      return message.data.id;
    }
  }
}
