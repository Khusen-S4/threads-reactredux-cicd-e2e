import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import google from 'eslint-config-google'

import { defineConfig, globalIgnores } from 'eslint/config'

// Google JavaScript Style Guide
export default defineConfig([
  globalIgnores(['dist']),

  js.configs.recommended,

  {
    ...google,

    files: ['**/*.{js,jsx}'],

    languageOptions: {
      globals: globals.browser,

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },

    rules: {
      ...reactHooks.configs.flat.recommended.rules,

      // opsional override
      'require-jsdoc': 'off',
    },
  },
])