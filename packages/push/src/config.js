function decamelize(string, separator = '_'){
  return string
    .replace(/([a-z\d])([A-Z])/g, `$1${separator}$2`)
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, `$1${separator}$2`)
    .toLowerCase();
}

const defaultConfiguration = {
  pushKey: null,
  pushEndpoint: 'https://push.userlist.com',
};

export default class Config {
  constructor(configFromConstructor) {
    let { configFromDefault, configFromEnvironment } = this;

    if(configFromConstructor instanceof Config) {
      configFromConstructor = configFromConstructor.config;
    }

    this.config = Object.assign(
      {},
      configFromDefault,
      configFromEnvironment,
      configFromConstructor
    );

    for(let key of this.configKeys) {
      Object.defineProperty(this, key, {
        set(value) {
          this.config[key] = value;
        },

        get() {
          return this.config[key];
        }
      })
    }
  }

  get configKeys() {
    return Object.keys(this.configFromDefault);
  }

  get configFromDefault() {
    return defaultConfiguration;
  }

  get configFromEnvironment() {
    let config = {}

    for(let key of this.configKeys) {
      let value = process.env[`USERLIST_${decamelize(key).toUpperCase()}`];

      if(typeof value !== 'undefined') {
        config[key] = value;
      }
    }

    return config;
  }
}
