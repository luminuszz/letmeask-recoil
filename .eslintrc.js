module.exports = {
  extends: ['next/core-web-vitals', 'prettier'],
  plugins: ['eslint-plugin-import-helpers'],
  rules: {
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: ['/^next/', 'module', '/^@/', [('index', 'parent', 'sibling')]],
        alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
  },
};
