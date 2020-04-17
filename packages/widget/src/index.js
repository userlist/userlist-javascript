import Channel from './channel';
import styles from './styles.css';

function createWidget(widgetURI) {
  let body = document.body;

  let style = window.document.createElement('style');
  let element = window.document.createElement('div');
  let iframe = window.document.createElement('iframe');

  iframe.src = widgetURI;

  element.appendChild(style);
  element.appendChild(iframe);
  element.classList.add('userlist-container');

  body.appendChild(element);

  style.type = 'text/css';
  style.appendChild(document.createTextNode(styles));

  return element;
}

class Widget {
  constructor(tokenProvider, endpoint = 'https://widget.userlist.com') {
    this.tokenProvider = tokenProvider;

    this.connectChannel().then((channel) => {
      channel.on('resize', (dimensions) => {
        if(dimensions.height > 0) {
          this.resize(dimensions);
          this.open();
        } else {
          this.close();
        }
      });
    });

    this.element = createWidget(endpoint);
  }

  connectChannel() {
    return this._connectChannel = this._connectChannel || Channel.listen(window).then((channel) => {
      return this.tokenProvider.receiveToken().then((token) => {
        channel.postMessage('init', { token });

        return channel;
      });
    });
  }

  resize({ height }) {
    this.element.style.height = `${height}px`;
  }

  open() {
    this.element.classList.add('userlist-open');
    this.element.classList.remove('userlist-closed');
  }

  close() {
    this.element.classList.add('userlist-closed');
    this.element.classList.remove('userlist-open');
    this.resize({ height: 0 });
  }

  destroy() {
    if(this._connectChannel) {
      this.connectChannel().then((channel) => channel.close());
    }

    this.element.remove();
  }
}

export {
  Widget,
  Channel
};
