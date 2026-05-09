import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // ---> AQUÍ AGREGAMOS LAS REGLAS <---
  {
    rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/no-unescaped-entities": "off", // Next.js tiene su propia versión de esta regla
    },
  },

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;