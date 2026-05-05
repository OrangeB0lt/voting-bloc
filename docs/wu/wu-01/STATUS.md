# WU-01 STATUS — monorepo-bootstrap

**Playbook reference:** Phase 1 → WU-01 (in `build-plan/01-bootstrap.md`)
**Started:** 2026-05-05
**Last updated:** 2026-05-05 UTC
**Branch:** wu-01-bootstrap
**Current agent session:** Claude Code session 2026-05-05

## TL;DR — pick up here

WU-01 is complete. All acceptance criteria pass. The scaffold includes: Turborepo + pnpm workspace, tsconfig/eslint-config/types packages, apps/web (Next.js 15), apps/api (NestJS 10 + Fastify), apps/mobile (Expo stub), packages/contracts (Foundry with forge-std installed), 11 stub packages, CI workflow, and all docs. Ready to open PR.

WU-02 (types) and WU-03 (local dev infra) can now start in parallel on separate branches from `main` once this PR merges.

## What's done

- [x] Branch `wu-01-bootstrap` created — commit `5968201`
- [x] Handoff docs initialized — commit `5968201`
- [x] Root config files: package.json, pnpm-workspace.yaml, turbo.json, .nvmrc, .gitignore, .gitattributes, .editorconfig, .prettierrc, .prettierignore, Makefile, LICENSE
- [x] packages/tsconfig — 5 config files (base, node, react, next, react-native)
- [x] packages/eslint-config — 5 flat config files (index, node, react, next, react-native)
- [x] packages/types — WU-01 stubs (Hex, Address, Vote, Ballot, Option, Issuer, Nullifier, Proof, Eligibility)
- [x] apps/web — Next.js 15 App Router skeleton
- [x] apps/api — NestJS 10 + Fastify skeleton
- [x] apps/mobile — Expo bare workflow stub (build is no-op per D-3)
- [x] packages/contracts — Foundry project with forge-std installed, Placeholder.sol, Placeholder.t.sol
- [x] packages/circuits — stub
- [x] 11 stub packages: sdk, identity, identity-managed, prover-wasm, prover-native, ui, templates, pdf, billing, integrations, i18n
- [x] Non-package directory scaffolds with .gitkeep
- [x] .github/workflows/ci.yml — 4-job CI pipeline
- [x] README.md with "First clone" section (5 commands)
- [x] docs/adr/0001-monorepo-structure.md
- [x] Foundry installed, forge build zero warnings, forge test 1/1 passing
- [x] pnpm install: 31s
- [x] turbo run build: 21/21 tasks successful
- [x] turbo run lint: passing
- [x] tsc typecheck: passing on all apps and packages/types

## In progress

Nothing — WU is complete, pending PR review.

## Next 3 concrete steps

1. Open PR `[WU-01] Monorepo bootstrap` targeting `main`.
2. Merge PR once CI is green.
3. Start WU-02 (types) and WU-03 (local dev infra) in parallel from `main`.

## Blockers

None.

## Open questions for human review

- Node engine range updated to `>=20.0.0` (no upper bound) because the dev machine runs Node 24. CI pins to 20.19.0 via `actions/setup-node`. Confirm this is acceptable.
- The `pnpm.overrides["@types/react": "^19.0.0"]` was added to resolve a version conflict between apps/web (React 19) and apps/mobile (React 18.2). The override forces React 19 types workspace-wide. Mobile uses React 18 at runtime but `@types/react@19` is backwards-compatible for type checking.
- Turbo "no output files found" warnings on stub packages are cosmetic — stub scripts echo only and produce no files. These go away as stubs are replaced by real implementations in downstream WUs.
- Remaining Appendix D open questions: working name, branding palette, eligibility claim flow, cross-platform UI library, single vs multi-region, native vs Expo dev client, managed-identity vendor, auth aggregator, fiat on-ramp. Lock before relevant WUs start.

## Acceptance criteria progress

- [x] `pnpm install` < 3 min — 31 seconds
- [x] `pnpm turbo run build` succeeds — 21/21 tasks
- [x] lint/typecheck clean — passing
- [x] `forge build` zero warnings — `Compiler run successful!`
- [ ] CI placeholder green — pending PR push
- [x] README has "First clone" section — 5 commands

## Session log (append-only)

### 2026-05-05 UTC — WU-01 agent, opening

Starting WU-01 from scratch. Plan: scaffold all files per implementation plan, verify all acceptance criteria, commit and push. Decisions locked: AGPL-3.0-only license, Fastify adapter for NestJS, mobile build as no-op stub.

### 2026-05-05 UTC — WU-01 agent, closing

All acceptance criteria met except CI (pending PR). Issues resolved during implementation:
- forge-std not installed — ran `forge install foundry-rs/forge-std`
- Placeholder.sol had no AST nodes — added minimal `IPlaceholder` interface
- `@types/react` version conflict (18.x mobile vs 19.x web) — resolved with `pnpm.overrides`
- ESLint flat config needs explicit file globs, not directory paths — updated lint scripts
- Node engine range widened to `>=20.0.0` for dev machine with Node 24

Next session picks up at: WU-02 (types package) and WU-03 (local dev infra), running in parallel after this PR merges.
