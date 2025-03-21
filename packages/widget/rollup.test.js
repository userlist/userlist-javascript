import config from './rollup.config.js';
import multi from '@rollup/plugin-multi-entry';
import mocha from 'rollup-plugin-mocha';

export default {
  input: {
    include: ['test/**/*.js'],
    exclude: ['test/helper.js'],
  },
  output: {
    file: 'tmp/test.cjs',
    format: 'cjs',
  },
  plugins: [
    ...config.plugins,
    multi(),
    mocha({
      cache: true,
    }),
  ],
};
