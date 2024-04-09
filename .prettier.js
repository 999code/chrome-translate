module.exports = {
  useTabs: false,
  tabWidth: 2,
  endOfLine: "auto",
  printWidth: 100,
  semi: true,
  singleQuote: true,
  quoteProps: "as-needed",
  proseWrap: "preserve",
  arrowParens: "always",
  bracketSpacing: true,
  htmlWhitespaceSensitivity: "ignore",
  ignorePath: ".prettierignore",
  jsxBracketSameLine: true,
  jsxSingleQuote: true,
  requireConfig: false,
  trailingComma: "none",
  vueIndentScriptAndStyle: true,
  overrides: [
    {
      files: "*.json",
      options: {
        printWidth: 200,
      },
    },
  ],
};
