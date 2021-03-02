module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
  ],
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: [
    "react",
  ],
  rules: {
    quotes: [0, "single", { avoidEscape: true }],
    semi: [2, "never"],
    "import/prefer-default-export": 0,
    "react/jsx-filename-extension": 0,
    "react/react-in-jsx-scope": 0,
    "no-case-declarations": 0,
    "no-plusplus": 0,
  },
}
