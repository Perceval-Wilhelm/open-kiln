import jslint from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tslint from "typescript-eslint";
import perfectionist from "eslint-plugin-perfectionist";
import react from "eslint-plugin-react";
import prettier from "eslint-config-prettier/flat";

export default tslint.config(
  { ignores: ["dist", ".storybook", "src/shared/components/ui/**"] },
  {
    extends: [
      jslint.configs.recommended,
      react.configs.flat.recommended,
      prettier,
      ...tslint.configs.recommended,
      ...tslint.configs.stylistic,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      react,
      perfectionist,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "perfectionist/sort-imports": [
        "error",
        {
          type: "alphabetical",
          internalPattern: ["~/.*", "~icons", "~router", "~shared/.*", "~config/.*", "~api/.*", "~styles/.*"],
          groups: [
            "type",
            ["builtin", "external"],
            "internal-type",
            "internal",
            "side-effect",
            ["parent-type", "sibling-type", "index-type"],
            ["parent", "sibling", "index"],
            "object",
            "unknown",
          ],
        },
      ],
      "perfectionist/sort-exports": ["error", { type: "alphabetical" }],
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../*"],
              message: "Please use absolute import instead relative import.",
            },
            {
              group: ["react-router-dom"],
              importNames: ["Navigate", "Link", "redirect", "useParams", "useNavigate"],
              message: "Please import from '@/router' instead of 'react-router-dom'.",
            },
          ],
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/no-unused-expressions": "off",
      "react/function-component-definition": ["error", { namedComponents: "function-declaration" }],
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "prefer-template": "error",
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/array-type": ["error", { default: "generic" }],
    },
    settings: {
      react: { version: "detect" },
    },
  },
);
