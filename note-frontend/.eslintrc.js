module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "cypress/globals": true
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react", "cypress"
    ],
    "rules": {
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-filename-extension': 'off',
      'no-undef': 'off',
    }
}
