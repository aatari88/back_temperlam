// eslint.config.mjs

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default tseslint.config(
  {
    ignores: ['dist', 'node_modules'],
  },

  eslint.configs.recommended,

  ...tseslint.configs.recommendedTypeChecked,

  eslintPluginPrettierRecommended,

  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        project: ['./tsconfig.json'], // 🔥 mejor que projectService
        tsconfigRootDir: process.cwd(),
      },
    },
  },

  {
    rules: {
      /**
       * 🔥 Backend-friendly rules
       */
      '@typescript-eslint/no-explicit-any': 'off',

      // En backend esto molesta mucho con Prisma
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',

      '@typescript-eslint/no-floating-promises': 'warn',

      /**
       * 🧹 Clean code realista
       */
      '@typescript-eslint/consistent-type-imports': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],

      /**
       * 🎨 Prettier
       */
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },
);
