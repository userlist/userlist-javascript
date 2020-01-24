import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'Userlist'
  },
  plugins: [
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
