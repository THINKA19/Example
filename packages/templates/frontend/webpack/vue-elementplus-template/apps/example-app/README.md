# @acme/example-app

> Temporary sample app. Delete it when the first real app arrives.

## Commands

| Command          | What it does                             |
| ---------------- | ---------------------------------------- |
| `pnpm dev`       | Run with file watching (needs lib built) |
| `pnpm build`     | Compile to `dist/`                       |
| `pnpm start`     | Run the compiled output                  |
| `pnpm test`      | Run unit tests                           |
| `pnpm lint`      | Lint                                     |
| `pnpm typecheck` | Type-check including tests               |

Run inside this directory, or from the root with `pnpm --filter @acme/example-app <command>`.

## Environment

Copy `.env.example` to `.env` and adjust. Any new variable must also be added to `turbo.json`.
