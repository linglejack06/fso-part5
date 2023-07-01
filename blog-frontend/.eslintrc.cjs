module.exports = {
  env: { browser: true, es2020: true, "jest/globals": true, },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  overrides: [
    {
      files: ["./src/test/**"],
      plugins: ["jest"],
      extends: ["plugin:jest/recommended"],
      rules: { "jest/prefer-expect-assertions": "off" }
    }
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'react/prop-types': 'off',
  },
}
