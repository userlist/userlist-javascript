import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

import pkg from './package.json' with { type: "json" };

const plugins = [
  resolve({
    browser: true
  }),
  commonjs(),
  babel({
    babelHelpers: 'runtime'
  })
];

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: pkg.main,
        format: 'cjs'
      },
      {
        file: pkg.module,
        format: 'esm'
      }
    ],
    plugins
  },
  {
    input: 'src/umd.js',
    output: {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'Userlist'
    },
    plugins
  }
];
