module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react", "unused-imports"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "next/core-web-vitals",
    "prettier",
  ],
  rules: {
    // Customize rules as needed
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": "error",
    "no-trailing-spaces": ["error"],
  },
}
