// @ts-check
const base = require('./index');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  ...base,
  {
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
    },
  },
];
