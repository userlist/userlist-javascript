module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
  ],
  env: {
    browser: true,
    node: true,
    mocha: true,
    es6: true
  }
};
