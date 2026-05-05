// @ts-check
const next = require('@voting-bloc/eslint-config/next');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  ...next,
  {
    ignores: ['.next/**', 'out/**', 'node_modules/**'],
  },
  {
    files: ['**/*.test.ts', '**/*.test.tsx'],
    rules: { 'no-console': 'off' },
  },
];
