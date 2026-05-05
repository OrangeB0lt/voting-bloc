// @ts-check
const node = require('@voting-bloc/eslint-config/node');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  ...node,
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  {
    files: ['**/*.spec.ts', '**/*.test.ts'],
    rules: { 'no-console': 'off' },
  },
];
