'use strict';

module.exports = {
  overrides: [
    {
      files: '*.{js,ts,mjs,mts,cjs,cts}',
      options: {
        singleQuote: true,
        trailingComma: 'es5',
        printWidth: 120,
      },
    }
  ],
};
