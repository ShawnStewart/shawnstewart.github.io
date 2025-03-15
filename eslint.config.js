import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import sortKeysFixPlugin from 'eslint-plugin-sort-keys-fix';

export default tseslint.config(
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { ignores: ['*.config.{js,ts}'] },
  {
    languageOptions: {
      globals: globals.browser,
      parser: tsParser,
      parserOptions: { projectService: true },
    },
  },
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  reactPlugin.configs.flat.recommended,
  {
    plugins: {
      'react-hooks': reactHooksPlugin,
      'unused-imports': unusedImportsPlugin,
      'simple-import-sort': simpleImportSortPlugin,
      'sort-keys-fix': sortKeysFixPlugin,
    },
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: false,
        },
      ],
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
      '@typescript-eslint/no-unused-vars': 'off',
      'no-console': ['warn', { allow: ['error'] }],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@playwright/test',
              importNames: ['test'],
              message: "Import 'test' from '@e2e/test-override'",
            },
          ],
        },
      ],
      'react/jsx-sort-props': 'warn',
      'react/react-in-jsx-scope': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'sort-keys-fix/sort-keys-fix': 'warn',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'all',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
);
