module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './client/tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    '@typescript-eslint/no-throw-literal': [0],
    'import/no-cycle': [0],
    'no-promise-executor-return': [0],
    'react/require-default-props': [0],
    'react/jsx-no-constructed-context-values': [0],
    'no-param-reassign': [0],
    'consistent-return': [0],
    'react/jsx-props-no-spreading': [0],
    '@typescript-eslint/no-use-before-define': [0],
    '@typescript-eslint/no-shadow': [0],
    '@typescript-eslint/no-non-null-assertion': [0],
    '@typescript-eslint/no-non-null-asserted-optional-chain': [0],
    'react/display-name': [0],
    'no-nested-ternary': [0],
  },
};
