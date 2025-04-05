import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import { globalIgnores } from "@eslint/config-helpers";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  globalIgnores(['.history', 'lib', 'karma*.conf.js'])
);