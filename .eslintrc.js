module.exports = {
  settings: {
    react: {
      version: "detect", // Автоматически определяет версию React из package.json
    },
  },
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    semi: ["error", "always"], // Требует точку с запятой
    "no-floating-decimal": "error", // Запрет на .5 вместо 0.5
    "no-unused-expressions": "error", // Запрет выражений без вызова
    "no-loop-func": "warn", // Предупреждение про функции в цикле
    "react/prop-types": "off", // Отключает проверку prop-types (если не нужна)
    "react/no-unescaped-entities": "off",
  },
};
