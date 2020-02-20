import config from './rollup.config.js';

import serve from 'rollup-plugin-serve';

config.plugins.push(serve(['dist', 'public']));

export default config;
