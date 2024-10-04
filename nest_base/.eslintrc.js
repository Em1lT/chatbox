module.exports = {
  // extends: ['eslint:recommended'], // Possibly usefull, adds some rules
  root: true,
  env: {
    node: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 8,
  },
  overrides: [
    {
      // Extend TypeScript plugins here inside overrides that target .ts. This should prevent eslint form complaining
      // about the config files etc..
      files: ['*.ts'], // Your TypeScript files extension
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: [
        // 'eslint:recommended', // <- could use that also if needed. adds some extra checks
        'plugin:@typescript-eslint/recommended',
        // prettier eslint-config actually just turns off rules that conflict with prettier? Not really sure we
        // need that right now. Just make sure that prettierconfig is in sync with these rules so automatic formatting
        // in vscode doesn't generate code that doesn't pass eslint
        // 'prettier',
        // 'prettier/@typescript-eslint', <- this is not needed. included in prettier (on latest versions)
      ],

      parserOptions: {
        project: ['./tsconfig.json'], // Specify it only for TypeScript files
      },
      rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-extra-semi': 'off',
      },
    },
  ],
  rules: {
    'semi': ['error', 'always'],
    'indent': ['error', 2, { SwitchCase: 1 }],
    'no-extra-semi': 'off',
    'keyword-spacing': ['error', { before: true }],
    'block-spacing': ['error', 'never'],
    'curly': 'error',
    'object-curly-spacing': ['error', 'always'],
    'comma-spacing': ['error'],
    'space-infix-ops': ['error', { int32Hint: false }],
    'camelcase': 2,
    'space-before-blocks': "warn",
    'max-len': ['warn', { code: 250, ignoreComments: true }],
  },
};
