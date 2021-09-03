module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended', 'airbnb-base', 'eslint-config-prettier'],
  rules: {
    'arrow-body-style': 0,
    'comma-dangle': 0,
    'object-curly-newline': 0,
    'linebreak-style': 0,
    'no-plusplus': 0,
    'no-continue': 0,
    'class-methods-use-this': 0,

    'import/no-unresolved': 0,
    'import/extensions': 0,
    'import/prefer-default-export': 0,

    'no-shadow': 0,
    '@typescript-eslint/no-shadow': ['error'],
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': ['error']
  }
};
