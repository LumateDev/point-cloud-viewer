import { defineConfig } from 'eslint/config';
import tseslint from '@electron-toolkit/eslint-config-ts';
import eslintConfigPrettier from '@electron-toolkit/eslint-config-prettier';
import eslintPluginVue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import autoImportConfig from './.eslintrc-auto-import.mjs';

export default defineConfig(
  { ignores: ['**/node_modules', '**/dist', '**/out', '.eslintrc-auto-import.mjs'] },
  tseslint.configs.recommended,
  eslintPluginVue.configs['flat/recommended'],
  {
    languageOptions: {
      globals: autoImportConfig.globals,
    },
  },

  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        extraFileExtensions: ['.vue'],
        parser: tseslint.parser,
      },
    },
  },
  {
    files: ['**/*.{ts,mts,tsx,vue}'],
    rules: {
      'vue/require-default-prop': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/block-lang': [
        'error',
        {
          script: {
            lang: 'ts',
          },
        },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      eqeqeq: ['error', 'always'],
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
  eslintConfigPrettier
);
