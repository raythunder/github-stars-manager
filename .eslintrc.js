/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  parserOptions: {
    // Only ESLint 6.2.0 and later support ES2020.
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'plugin:vue/vue3-strongly-recommended',
    'eslint:recommended',
    '@vue/eslint-config-prettier',
    '.eslintrc-auto-import.json',
  ],
  rules: {
    'no-unused-vars': 1,
    'consistent-return': 0,
    'no-multi-assign': 'off',
    'linebreak-style': 'off',
    'no-bitwise': 0,
    'camelcase': 'off',
    'class-methods-use-this': 'off',
    'no-use-before-define': 0,
    'no-unused-expressions': 'off',
    'no-underscore-dangle': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    // Vue: Recommended rules to be closed or modify
    'vue/v-on-event-hyphenation': 0,
    'vue/multi-word-component-names': 0,
    'vue/require-default-prop': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/max-attributes-per-line': 0,
    // Vue: Add extra rules
    'vue/custom-event-name-casing': [2, 'camelCase'],
    'vue/no-v-text': 1,
    'vue/padding-line-between-blocks': 1,
    'vue/require-direct-export': 1,
    // Allow @ts-ignore comment
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    'no-console': 0,
    'no-shadow': 0,
    'no-param-reassign': 0,
    'no-debugger': process.env.NODE_ENV === 'development' ? 0 : 1,
  },
  env: {
    'browser': true,
    'node': true,
    'es6': true,
    'vue/setup-compiler-macros': true,
  },
  globals: {
    __DEV__: true,
    defineProps: true,
    $ref: true,
    $: true,
    $$: true,
  },
};
