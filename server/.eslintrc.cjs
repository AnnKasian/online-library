module.exports = {
  root: true,
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  extends: [
    '../.eslintrc.cjs'
  ],
  env: {
    node: true,
  },
};
