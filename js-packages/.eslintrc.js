const { join } = require('path');

const tsConfigFile = require(join(__dirname, 'tsconfig.json'));

const html = [
  {
    files: ['*.html'],
    parser: '@html-eslint/parser',
    plugins: [
      '@html-eslint',
      'html',
    ],
    extends: ['plugin:@html-eslint/recommended'],
    rules: {
      '@html-eslint/no-duplicate-id': 'error',
      '@html-eslint/indent': ['error', 2],
    },
  },
].map((v) => ({
  ...v,
  [Symbol('eslint-category')]: 'html',
}));

const react = [
  {
    files: ['*.jsx', '*.tsx'],
    plugins: ['react', 'react-hooks'],
    extends: [
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
    ],
    rules: {
      'react/react-in-jsx-scope': 0, // Not necessary in Next.js
      'react/prop-types': 0, // If using TypeScript, propTypes are often not needed
      'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
      'jsx-a11y/anchor-is-valid': 0, // Specific anchor handling in Next.js
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
  },
].map((v) => ({
  ...v,
  [Symbol('eslint-category')]: 'react',
}));

const json = [
  {
    files: ['*.json'],
    parser: 'jsonc-eslint-parser',
    extends: [
      'plugin:jsonc/all',
    ],
    rules: {
      'jsonc/indent': ['error', 2],
    },
  },
  {
    files: ['tsconfig.json', 'tsconfig.*.json', 'package.json'],
    rules: {
      'jsonc/key-name-casing': 0,
      'jsonc/sort-keys': 0,
    },
  },
].map((v) => ({
  ...v,
  [Symbol('eslint-category')]: 'json',
}));

const js = [
  {
    files: ['.eslintrc.js'],
    rules: {
      'import/no-dynamic-require': 0,
    },
  },
].map((v) => ({
  ...v,
  [Symbol('eslint-category')]: 'js',
}));

const typescript = [
  {
    files: ['*.ts', '*.tsx'],
    parser: '@typescript-eslint/parser',
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    rules: {
      '@typescript-eslint/no-shadow': 1,
      '@typescript-eslint/no-empty-function': 0,
      '@typescript-eslint/no-explicit-any': 1,
    },
    plugins: ['@typescript-eslint'],
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.ts', '.tsx', '.d.ts'],
        },
        typescript: {
          project: tsConfigFile,
        },
      },
    },
  },
  {
    files: ['jest.config.ts'],
    rules: {
      'global-require': 0,
      'import/no-dynamic-require': 0,
      '@typescript-eslint/no-var-requires': 0,
      '@typescript-eslint/no-non-null-assertion': 0,
      '@typescript-eslint/no-explicit-any': 0,
    },
  },
  {
    files: ['.imports/**/*.ts'],
    rules: {
      '@typescript-eslint/ban-ts-comment': 0,
    },
  },
].map((v) => ({
  ...v,
  [Symbol('eslint-category')]: 'typescript',
}));

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'airbnb/hooks',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignorePatterns: [
    '!.imports',
    '!@modules',
  ],
  rules: {
    'no-plusplus': 0,
    'arrow-body-style': 0,
    'no-nested-ternary': 0,
    'no-await-in-loop': 1,
    'no-unused-vars': 1,
    'no-param-reassign': 0,
    'no-undef': 0,
    'no-use-before-define': 0,
    'import/order': 0,
    'import/prefer-default-export': 0,
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-relative-packages': 0,
    'consistent-return': 0,
  },
  overrides: [
    ...js,
    ...typescript,
    ...react,
    ...html,
    ...json,
  ],
};
