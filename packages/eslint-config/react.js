// @ts-check
const base = require('./index');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  ...base,
  {
    rules: {
      'react/prop-types': 'off',
    },
  },
];
