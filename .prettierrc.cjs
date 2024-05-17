module.exports = {
  useTabs: false,
  trailingComma: "none",
  semi: false,
  endOfLine: "lf",
  tabWidth: 2,
  plugins: ["prettier-plugin-svelte"],
  overrides: [
    { files: "*.svelte", options: { parser: "svelte" } },
    {
      files: ["tailwind.config.ts"],
      options: {
        printWidth: 120
      }
    }
  ]
}
