# ADR-0001: Monorepo tooling for Phase 0

- Status: Accepted
- Scope: Phase 0 (Monorepo Foundation) only

## Context

We are building a long-lived engineering platform, incrementally, driven by real projects.
Phase 0 provides a stable monorepo base. It deliberately contains no templates, CLI,
generators or shared "utility" packages.

## Decisions

| Area               | Choice                                     | Main alternative considered |
| ------------------ | ------------------------------------------ | --------------------------- |
| Package manager    | pnpm workspaces + catalog                  | npm, Yarn Berry, Bun        |
| Task orchestration | Turborepo                                  | Nx, plain `pnpm -r`         |
| Language           | TypeScript, `strict`, NodeNext modules     | Project References          |
| Lint / format      | ESLint (flat config) + Prettier            | Biome                       |
| Tests              | Vitest                                     | Jest                        |
| Git hooks          | Husky + lint-staged                        | Lefthook                    |
| Commits            | Conventional Commits, enforced by commitlint | none                      |
| CI                 | GitHub Actions                             | -                           |

Package scripts are the contract. Turborepo only orders, caches and filters tasks, so the
orchestrator can be replaced without touching project code.

## Rules fixed by this ADR

1. **Dependency direction:** `apps -> packages`. Packages never depend on apps. Apps never depend on
   apps. No cycles. Enforced by `pnpm check:boundaries` and by Turborepo's own cycle detection.
2. **Package admission:** a package needs two real consumers, a capability name (never `shared`,
   `utils`, `common`, `helpers`, `misc`) and a README stating what it is and is not responsible for.
3. **Internal packages are compiled** (`src/` to `dist/`, consumed through `exports`). Tasks that
   consume them declare `dependsOn: ["^build"]`. Chosen because the sample app is a plain Node
   program; the alternative (exporting TypeScript source) requires every consumer to run a bundler.
4. **Workspace globs are exactly `apps/*` and `packages/*`.** A future `templates/` directory MUST stay
   outside the workspace, otherwise template `package.json` files pollute the dependency graph.
5. **Environment variables:** every app has `.env.example`; every variable is declared in the `env` of
   the relevant tasks in `turbo.json`. Undeclared variables are neither passed to tasks nor part of the
   cache key.
6. **Root configuration files are cache inputs.** They are listed in `globalDependencies` in
   `turbo.json`. Adding a root config file that affects task results means adding it there.

## Deviations from the earlier proposal (and why)

- `tools/` (config packages) was removed: there is one configuration variant, so the split had nothing to
  carry. Reintroduce `tools/config-*` when a second variant appears (e.g. node and react tsconfigs).
- `scripts/` was created after all, for one real need: `check-boundaries.mjs`.
- `dependency-cruiser` was replaced by `check-boundaries.mjs`. Package-level rules are clearer when read
  directly from the `package.json` graph, the same graph pnpm and Turborepo use, and it needs no dependency.
- Each project has `tsconfig.json` (type-check, includes tests) and `tsconfig.build.json` (emit, excludes tests).

## Revisit when

- A package must be published to npm, or needs several build outputs.
- CI time grows enough that remote caching pays off.
- We need code generation: evaluate Nx generators versus a custom generator (Phase 3).
- A second TypeScript or ESLint configuration variant appears.
