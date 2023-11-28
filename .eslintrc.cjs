/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    'standard',
    'plugin:vue/vue3-strongly-recommended',
    'eslint-config-prettier',
  ],
  plugins: ['eslint-plugin-prettier'],
  rules: {
    'vue/no-dupe-keys': 'warn',
    'prettier/prettier': 'error',
    'no-unused-vars': 'warn',
    'vue/multi-word-component-names': 'off',
  },
  ignorePatterns: ['node_modules', 'dist'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
}
