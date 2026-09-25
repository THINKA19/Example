# Dependency rules

```text
apps  -->  packages  -->  (external dependencies)

Forbidden: packages -> apps, apps <-> apps, cycles between packages.
```

| Rule                                                                              | Enforced by                    |
| --------------------------------------------------------------------------------- | ------------------------------ |
| Packages never depend on apps; apps never depend on apps                          | `pnpm check:boundaries` (CI)   |
| No dependency cycles                                                              | `check:boundaries`, Turborepo  |
| Internal dependencies use `workspace:*`                                           | `check:boundaries`             |
| Forbidden package names (`shared`, `utils`, `common`, `helpers`, `misc`)          | `check:boundaries`             |
| Every project has `build`, `lint`, `typecheck`, `test` (apps also `dev`)          | `check:boundaries`             |
| Workspace globs are exactly `apps/*` and `packages/*`                             | `check:boundaries`             |
| Consumers use only a package's public entry, no deep imports                      | `exports` field in package.json |
| Undeclared dependencies are not usable (no hoisting)                              | pnpm strict `node_modules`     |
| Changes to root configuration invalidate caches                                   | `globalDependencies` in turbo.json |
| Environment variables are declared                                                | `.env.example` + `turbo.json`  |

## When a rule seems to be in the way

Do not bypass it. Open a PR that changes the rule, its enforcement and ADR-0001 together.
