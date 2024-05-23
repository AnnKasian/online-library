module.exports = {
  root: true,
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['react-refresh'],
  extends: [
    '../.eslintrc.cjs',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  env: {
    browser: true,
  },
  ignorePatterns: ['vite.config.ts'],
  rules: {
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
};
