import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';

import autoprefixer from 'autoprefixer';
import initial from 'postcss-initial';

import pkg from './package.json' with { type: 'json' };

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'esm',
    },
  ],
  plugins: [
    resolve(),
    babel({
      babelHelpers: 'runtime',
    }),
    commonjs(),
    postcss({
      inject: false,
      minimize: true,
      plugins: [autoprefixer, initial],
    }),
  ],
};
