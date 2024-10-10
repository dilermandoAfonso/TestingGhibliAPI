import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module", 
      globals: {
        ...globals.browser,  // Globais do navegador
        ...globals.jest,     // Globais para Jest
        global: true         // Declaração explícita para o objeto global
      },
    },
    plugins: {
      js: pluginJs,
    },
    rules: {
      ...pluginJs.configs.recommended.rules, 
    },
  },
];
