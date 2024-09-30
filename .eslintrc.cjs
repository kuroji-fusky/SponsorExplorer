/** @type { import("eslint").Linter.Config } */
module.exports = {
  root: true,
  extends: ["next/core-web-vitals", "next/typescript"],
  rules: {
    "@typescript-eslint/no-unused-vars": 1,
    "@typescript-eslint/no-explicit-any": 2,
    "@typescript-eslint/no-namespace": 0,

    "react/no-unescaped-entities": 0,
  },
}
