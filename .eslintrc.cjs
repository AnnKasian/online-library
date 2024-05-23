module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    project: [
      './tsconfig.json',
      './client/tsconfig.json',
      './server/tsconfig.json',
      './shared/tsconfig.json',
    ],
    tsconfigRootDir: __dirname,
  },
  settings: {
    typescript: true,
    node: true,
  },
  plugins: ['simple-import-sort'],
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/strict',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic',
    'plugin:prettier/recommended',
    'plugin:sonarjs/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  rules: {
    'no-extra-boolean-cast': 'off',
    'import/no-unresolved': 'off',
    'sonarjs/cognitive-complexity': 'off',
    '@typescript-eslint/no-extraneous-class': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-for-in-array': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    '@typescript-eslint/prefer-reduce-type-parameter': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/use-unknown-in-catch-callback-variable': 'off',
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/quotes': ['error', 'single'],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        'args': 'all',
        'argsIgnorePattern': '^_',
        'caughtErrors': 'all',
        'caughtErrorsIgnorePattern': '^_',
        'destructuredArrayIgnorePattern': '^_',
        'varsIgnorePattern': '^_',
        'ignoreRestSiblings': true,
      },
    ],
    'prettier/prettier': ['warn'],
  },
  overrides: [
    {
      files: ['*.d.ts'],
      rules: {
        '@typescript-eslint/consistent-type-definitions': 'off',
      }
    }
  ],
};
