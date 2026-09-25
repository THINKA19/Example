# Dependency rules

```text
apps  -->  packages  -->  (external dependencies)
apps, packages  -->  tools (devDependency only)

Forbidden: packages -> apps, apps <-> apps, cycles between packages,
           tools -> apps, tools -> packages.
```

| Rule                                                                     | Enforced by                        |
| ------------------------------------------------------------------------| ------------------------------------|
| Packages never depend on apps; apps never depend on apps                | `pnpm check:boundaries` (CI)        |
| `tools/*` never depends on `apps/*` or `packages/*`                     | `pnpm check:boundaries` (CI)        |
| No dependency cycles                                                    | `check:boundaries`, Turborepo       |
| Internal dependencies use `workspace:*`                                 | `check:boundaries`                  |
| Forbidden package names (`shared`, `utils`, `common`, `helpers`, `misc`)| `check:boundaries`                  |
| Every project has `build`, `lint`, `typecheck`, `test` (apps also `dev`)| `check:boundaries`                  |
| Workspace globs are exactly `apps/*`, `packages/*`, `tools/*`           | `check:boundaries`                  |
| Consumers use only a package's public entry, no deep imports            | `exports` field in package.json     |
| Undeclared dependencies are not usable (no hoisting)                    | pnpm strict `node_modules`          |
| Root config changes invalidate caches                                   | `globalDependencies` in turbo.json  |
| Environment variables are declared                                      | `.env.example` + `turbo.json`       |
| Every app/package selects its ESLint variant explicitly                 | `eslint.config.js` re-export, see ADR-0002 |

## When a rule seems to be in the way

Do not bypass it. Open a PR that changes the rule, its enforcement, and the
relevant ADR together.
