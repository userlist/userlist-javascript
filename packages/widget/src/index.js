import Channel from './channel';

function createWidget(widgetURI) {
  let element = window.document.createElement('div');
  let iframe = window.document.createElement('iframe');

  iframe.src = widgetURI;
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = 'none';

  element.style.border = 'none';
  element.style.position = 'fixed';
  element.style.bottom = '30px';
  element.style.right = '30px';
  element.style.height = '0px';
  element.style.width = '0px';
  element.style.borderRadius = '20px';
  element.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
  element.style.opacity = 0;
  element.style.transition = 'opacity .2s, transform .2s';
  element.style.transform = 'translateY(100px)';
  element.style.overflow = 'hidden';

  element.appendChild(iframe);
  document.body.appendChild(element);

  return element;
}

class Widget {
  constructor(tokenProvider, endpoint = 'https://widget.userlist.com') {
    this.tokenProvider = tokenProvider;
    this.element = createWidget(endpoint);

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
  }

  async connectChannel() {
    return this._connectChannel = this._connectChannel || Channel.listen(window).then((channel) => {
      return this.tokenProvider.receiveToken().then((token) => {
        channel.postMessage('init', { token });

        return channel;
      });
    });
  }

  resize({ width, height }) {
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
  }

  open() {
    this.element.style.transform = 'translateY(0px)';
    this.element.style.opacity = 1;
  }

  close() {
    this.element.style.opacity = 0;
    this.element.style.transform = 'translateY(100px)';
  }
}

export {
  Widget,
  Channel
};
