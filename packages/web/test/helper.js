import { JSDOM } from 'jsdom';

var { window } = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);

if (global.window === undefined) {
  global.window = window;
}

if (global.document === undefined) {
  global.document = window.document;
}

if (global.self === undefined) {
  global.self = window;
}

if (global.addEventListener === undefined) {
  global.addEventListener = window.addEventListener;
}

if (global.removeEventListener === undefined) {
  global.removeEventListener = window.removeEventListener;
}
