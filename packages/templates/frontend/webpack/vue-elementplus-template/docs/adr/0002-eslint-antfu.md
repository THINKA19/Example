# ADR-0002: Switch to @antfu/eslint-config, drop Prettier

- Status: Accepted
- Supersedes: the ESLint + Prettier setup described in ADR-0001

## Decision

- Replace the ESLint + Prettier split with `@antfu/eslint-config` as the single
  formatting-and-linting tool.
- The old ESLint + Prettier configuration is not kept anywhere in this repository,
  including under `tools/`, as a "reference" or "fallback". If it needs to be
  looked up again, it is in git history, in the commit that predates this ADR.
- ESLint configuration is a workspace package, `tools/config-eslint`, built as a
  factory:
  - `factory.js` wraps `@antfu/eslint-config` and holds every rule and ignore
    pattern that applies to the whole repository, regardless of framework.
  - Each framework variant (`node.js`, `vue.js`, `react.js`, `uniapp.js`) is a
    thin file that only passes framework-specific options to the factory. New
    variants must not repeat repository-wide rules; they belong in `factory.js`.
- Every app and package declares its own `eslint.config.js` that re-exports the
  matching variant explicitly:
  ```js
  export { default } from "../../tools/config-eslint/node.js";
  ```
  This is deliberate: `@antfu/eslint-config` can auto-detect installed
  frameworks, but in a pnpm workspace, dependencies from unrelated apps can be
  hoisted into a shared `node_modules`, which risks the auto-detection enabling
  the wrong framework's rules for a given project. Explicit variant selection
  avoids depending on hoisting behaviour to determine lint rules.

## Current status of each variant

| Variant     | Status                                                                 |
| ----------- | ----------------------------------------------------------------------|
| `node.js`   | In use (`example-app`, `example-lib`, the config package itself)      |
| `vue.js`    | Placeholder only. Not run against a real `.vue` file.                 |
| `react.js`  | Placeholder only. Not run against real `.tsx` files.                  |
| `uniapp.js` | Placeholder only. Conditional-compilation comments (`// #ifdef ...`) have no ESLint handling yet; this is a known open problem, not a solved one. |

None of the three placeholders should be treated as validated. Before pointing a
real project at one, read the TODO comment at the top of that file.

## Consequences

- `.prettierrc`, `.prettierignore`, the `format` / `format:check` scripts, and
  `prettier` / `eslint-config-prettier` as dependencies are removed entirely.
- The style enforced is `@antfu/eslint-config`'s own conventions (e.g. no
  semicolons, single quotes), which is a stated preference of its author, not an
  industry default. The team accepted this trade-off explicitly.
- Existing code needs a one-time `eslint --fix` pass, committed on its own,
  separate from any functional change.
- `tools/config-eslint`'s dependency versions are pinned via the catalog
  (`pnpm-workspace.yaml`), never `latest`, since the package's rule set changes
  between releases. Upgrades go through their own verification pass.
- Framework-specific lint plugins (`eslint-plugin-vue`, `eslint-plugin-react`,
  etc.) are deliberately NOT pinned separately in the catalog. `@antfu/eslint-config`
  resolves them itself when `{ vue: true }` / `{ react: true }` is passed.
- `tsconfig.base.json` keeps `verbatimModuleSyntax: true`, which pairs with the
  `ts/consistent-type-imports` rule set in `factory.js`. Changing one without the
  other will produce conflicting or redundant errors.
- The boundary checker (`scripts/check-boundaries.mjs`) now also covers
  `tools/*`: it must not depend on `apps/*` or `packages/*`, and is subject to
  the same required-script contract (scripts may be no-ops, since `tools/*`
  holds dev-time configuration, not runtime code).

## Revisit when

- A real Vue, React, or uniapp project is added: validate the corresponding
  variant against real files before relying on it, and update its status in the
  table above.
- The uniapp conditional-compilation problem needs to move from "known, open" to
  "solved" once the first real uniapp project surfaces actual failure cases —
  do not pre-write ignore patterns without a real case to test against.
