// @ts-check
const reactNative = require('@voting-bloc/eslint-config/react-native');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  ...reactNative,
  {
    ignores: ['.expo/**', 'dist/**', 'node_modules/**'],
  },
];
