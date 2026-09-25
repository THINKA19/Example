import antfu from "@antfu/eslint-config";

/**
 * Repository-wide ESLint factory.
 *
 * Each framework variant (node.js, vue.js, react.js, uniapp.js) only passes the
 * framework-specific options through to @antfu/eslint-config. Repository-wide
 * rules and ignores live here ONCE so adding a new variant never means repeating
 * them.
 *
 * Do not add per-framework rules here. If a rule only makes sense for Vue or
 * React, it belongs in that variant file, not in this shared factory.
 */
export function createConfig(options = {}, ...userConfigs) {
  return antfu(
    {
      typescript: true,
      ignores: ["**/dist/**", "**/.turbo/**", "**/node_modules/**", "**/coverage/**"],
      ...options,
    },
    // Pairs with `verbatimModuleSyntax: true` in tsconfig.base.json: both must
    // agree, otherwise type-only imports get flagged by one and not the other.
    {
      rules: {
        "ts/consistent-type-imports": "error",
      },
    },
    ...userConfigs,
  );
}
