import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

import autoprefixer from 'autoprefixer';
import initial from 'postcss-initial';

import pkg from './package.json';

export default {
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
  plugins: [
    resolve(),
    commonjs(),
    postcss({
      inject: false,
      minimize: true,
      plugins: [
        autoprefixer,
        initial
      ]
    }),
    babel({
      runtimeHelpers: true
    })
  ]
};
