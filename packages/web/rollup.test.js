import { plugins } from './rollup.config.js';
import multi from '@rollup/plugin-multi-entry';
import mocha from 'rollup-plugin-mocha';
import json from '@rollup/plugin-json';

export default {
  input: {
    include: ['test/helper.js', 'test/**/*.js'],
  },
  external: ['jsdom', 'ws'],
  output: {
    file: 'tmp/test.cjs',
    format: 'cjs',
  },
  plugins: [
    ...plugins,
    multi(),
    json(),
    mocha({
      cache: true,
    }),
  ],
};
