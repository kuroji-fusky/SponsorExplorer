module.exports = {
	useTabs: false,
	singleQuote: false,
	trailingComma: "none",
	semi: false,
  endOfLine: "lf",
  tabWidth: 2,
	printWidth: 90,
	plugins: ["prettier-plugin-svelte", "@trivago/prettier-plugin-sort-imports"],
	overrides: [
    { files: "*.svelte", options: { parser: "svelte" } },
    {
      "files": ["tailwind.config.ts"],
      "options": {
        "printWidth": 120
      }
    }
  ],
  importOrder: [
    ".scss$|.css$",
    "next|^next/(.*)",
    "react$|react-dom",
    "<THIRD_PARTY_MODULES>",
    "^@/types/(.*)$",
    "^hooks/(.*)$",
    "^components/(.*)$",
    "^[./]"
  ],
  importOrderSortSpecifiers: true
}
