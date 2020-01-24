import babel from 'rollup-plugin-babel';
import multi from 'rollup-plugin-multi-input';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/**/*.js',
  output: {
    dir: 'dist',
    format: 'esm'
  },
  plugins: [
    multi(),
    resolve(),
    commonjs({
      namedExports: {
        '@rails/actioncable': ['createConsumer']
      }
    }),
    babel({
      runtimeHelpers: true
    }),
  ]
};
