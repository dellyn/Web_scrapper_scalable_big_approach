module.exports = {
  extends: ['../js-packages/.eslintrc.js', 'plugin:storybook/recommended'],
  overrides: [{
    files: ['test.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 0,
    },
  }],
};
