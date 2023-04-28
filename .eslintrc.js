module.exports = {
  extends: [
    'eslint-config-airbnb-base',
  ],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  rules: {
    'import/extensions': [
      'error',
      {
        js: 'always',
      }],
  },
};
