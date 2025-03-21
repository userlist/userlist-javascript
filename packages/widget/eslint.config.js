import globals from 'globals';

import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier/recommended';

import babelParser from '@babel/eslint-parser';

export default [
  js.configs.recommended,
  prettier,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.mocha,
        window: 'readonly',
        document: 'readonly',
      },

      parser: babelParser,
      ecmaVersion: 2018,
      sourceType: 'module',
    },
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
  },
  {
    ignores: ['node_modules', 'dist', '!**/.*'],
  },
];
