module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    es2021: true,
    node: true
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "next"],
  plugins: ["unused-imports", "@stylistic"],
  rules: {
    "no-var": "error",
    "no-console": "warn",
    "no-else-return": ["error", { allowElseIf: false }],
    "no-duplicate-imports": "warn",
    "max-depth": ["error", 3],
    "unused-imports/no-unused-imports": "error",
    "react/no-unescaped-entities": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/member-delimiter-style": "warn",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@stylistic/newline-per-chained-call": ["error", { ignoreChainWithDepth: 3 }],
    "@stylistic/no-confusing-arrow": ["error", { onlyOneSimpleParam: true }],
    "@stylistic/no-floating-decimal": "error",
    "@stylistic/wrap-regex": "error",
    "@stylistic/new-parens": ["error", "always"],
    "@stylistic/arrow-spacing": "error",
    "@stylistic/arrow-parens": ["error", "always"],
    "@stylistic/array-element-newline": ["error", "consistent"],
    "@stylistic/object-curly-spacing": ["error", "always"],
    "@stylistic/object-curly-newline": [
      "error",
      {
        minProperties: 3,
        consistent: true
      }
    ],
    "@stylistic/function-call-spacing": ["error", "never"],
    "@stylistic/space-before-blocks": "error",
    "@stylistic/keyword-spacing": ["error", { before: true }],
    "@stylistic/padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: "directive",
        next: "*"
      },
      {
        blankLine: "always",
        prev: ["multiline-const", "function"],
        next: ["const", "let", "block-like", "export", "return", "try"]
      },
      {
        blankLine: "always",
        prev: "block-like",
        next: "*"
      },
      {
        blankLine: "always",
        prev: "*",
        next: "try"
      }
    ]
  },
  parser: "@typescript-eslint/parser",
  ignorePatterns: [
    ".next/",
    "public/sw.js",
    "public/workbox-*",
    "public/worker-*",
    "*.tsbuildinfo"
  ]
}
