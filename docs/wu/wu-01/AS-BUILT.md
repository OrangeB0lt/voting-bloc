# WU-01 AS-BUILT — monorepo-bootstrap
**Playbook reference:** Phase 1 → WU-01 (in `build-plan/01-bootstrap.md`)
**PR:** #1 (pending merge)  |  **Merged:** —

## Summary

WU-01 delivers the full Turborepo + pnpm monorepo scaffold that all downstream WUs build on. Every workspace package (apps and packages) is present in runnable stub form, the root toolchain is wired (TypeScript, ESLint v9 flat config, Prettier, Makefile), and the CI pipeline is live. The implementation matches the playbook spec exactly, with three deviations noted below.

Foundry is installed and the `packages/contracts` workspace has `forge-std` via `lib/`, a minimal `IPlaceholder` interface in `Placeholder.sol`, and a passing forge test. All 21 Turborepo tasks complete successfully. `pnpm install` takes ~31 seconds on the dev machine.

## Deviations from the playbook spec

- **CLAUDE.md added at repo root** — not in the spec, but required by the Claude Code agent harness for context loading. Contains commands, architecture table, WU workflow rules, conventions, coverage gates, and hard invariants. Committed in the final session of WU-01.
- **Node engine range `>=20.0.0` (unbounded upper)** — spec says pin to a single LTS version via `.nvmrc` + `volta`. `.nvmrc` pins `20.19.0`; CI uses `actions/setup-node@v4` with Node 20.19.0. Root `package.json` `engines` field uses `>=20.0.0` (no upper bound) because the dev machine runs Node 24 and pnpm rejects a strict pin at install time. See D-4 context in `DECISIONS.md`. (D-4 covers TypeScript module resolution; the Node engine call was undocumented — adding here for completeness.)
- **`pnpm.overrides["@types/react": "^19.0.0"]`** — `apps/web` requires React 19 types; `apps/mobile` ships React 18.2 at runtime. The override forces `@types/react@19` workspace-wide. `@types/react@19` is backwards-compatible for type-checking; the runtime version difference is real but safe for the stub state.

## Key commits

- `5968201` — docs: initialize handoff docs (STATUS, DECISIONS, PROJECT-STATUS)
- `cc0f88d` — feat(wu-01): monorepo bootstrap — Turborepo + pnpm workspace scaffold (all files)
- `27d63f7` — docs(wu-01): resume session — commit CLAUDE.md, open session log

## What downstream WUs need to know

- **packages/types** (`@voting-bloc/types`) is a stub with placeholder exports only. WU-02 fills in the real domain types and Zod schemas. Import from this package immediately; don't define local copies.
- **ESLint v9 flat config** throughout. Every app and package has an `eslint.config.js`. Do NOT create `.eslintrc.*` files — they will conflict. The shared configs live in `packages/eslint-config/`.
- **TypeScript moduleResolution split:** `apps/api` and all `packages/*` use `Node16`; `apps/web` uses `Bundler` (Next.js requirement). `apps/mobile` uses CommonJS + Node16 (Metro does not support ESM).
- **Mobile build is a no-op stub** (`echo "mobile build is a no-op stub"`). Real Expo build gates on WU-27 (EAS + signing). Do not run `expo export` in CI before WU-27.
- **Foundry path:** `packages/contracts` contains `forge-std` in `lib/`. Run `forge build` / `forge test` from inside `packages/contracts/`, or use `make forge-build` / `make forge-test` from repo root.
- **`make dev-up` / `make dev-down`** are stubs until WU-03 delivers the docker-compose stack.
- **CI:** `.github/workflows/ci.yml` runs lint → typecheck → build → forge-build on every PR. The `mobile-stub` job is a placeholder that just echoes; it becomes real in WU-27. Forge test is not in CI yet (no fuzz budget set up); WU-04 will add it when contracts are real.
- **Appendix D open questions:** Working name (voting-bloc placeholder), branding palette, eligibility claim flow, mobile UI library, region strategy, Expo vs native client, managed-identity vendor, auth aggregator, fiat on-ramp — all unresolved. Lock before the relevant WUs start.

## Test commands

```bash
pnpm install                         # should complete < 3 min
pnpm turbo run build                 # 21/21 tasks
pnpm turbo run lint                  # clean
pnpm turbo run typecheck             # clean
make forge-build                     # Compiler run successful!, zero warnings
make forge-test                      # 1/1 test passing
```

## Follow-ups (not blockers)

- CLAUDE.md deviation from spec: if the team decides CLAUDE.md belongs under `docs/` or `.claude/`, move it — nothing imports it by path.
- Appendix D open questions above should each get a decision record before the WU that needs them starts.
- CI `forge test` job: add once `packages/contracts` has real tests with coverage gates (WU-04+).
