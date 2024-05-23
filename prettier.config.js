/** @type {import("prettier").Config} */
const config = {
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: [
    '^components/(.*)$',
    '^@/(.*)$',
    '^#/(.*)$',
    '^~/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderParserPlugins: ['typescript', 'decorators-legacy', 'jsx'],
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: 'preserve',
  bracketSpacing: true,
  arrowParens: 'always',
  overrides: [
    {
      files: '*.scss',
      options: {
        singleQuote: true,
      },
    },
    {
      files: '*.html',
      options: {
        printWidth: 9999,
      },
    },
  ],
};

export default config;
