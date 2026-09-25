# Adding an app or a package

Both follow the same contract. Copy `apps/example-app` or `packages/example-lib` as a starting point.

## Before creating a package

- [ ] Are there at least two real consumers? If not, keep the code inside the app.
- [ ] Is the name a capability (`logger`, `http-client`)? Never `shared`, `utils`, `common`, `helpers`.

## Steps

1. Create `apps/<name>/` or `packages/<name>/`. The directory name must equal the package name without
   its scope.
2. `package.json`
   - `name`: `@acme/<name>`, `"type": "module"`, `"private": true`
   - Scripts, all required: `build`, `lint`, `typecheck`, `test`. Apps also need `dev`.
   - Dependencies use `catalog:` for external packages and `workspace:*` for internal ones.
   - Add `eslint`, `typescript`, `vitest` to `devDependencies` (from the catalog).
3. `tsconfig.json` extends `../../tsconfig.base.json`; `tsconfig.build.json` extends it and emits `dist/`.
4. Packages only: `exports` points at a single entry (`dist/index.js` and its types), plus a `README.md`
   with "Responsible for" and "Not responsible for".
5. Apps only: add `.env.example`. Declare each variable in `turbo.json` under the tasks that need it.
6. Run `pnpm install`, then `pnpm check:boundaries` and `pnpm verify`.

## Adding an external dependency

Add the version to `catalog:` in `pnpm-workspace.yaml`, then reference it as `"catalog:"` in the project.
