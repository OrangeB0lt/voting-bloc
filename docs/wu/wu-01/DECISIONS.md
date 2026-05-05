# WU-01 DECISIONS — monorepo-bootstrap

## D-1: License choice (MIT vs AGPL-3.0-only)

**Date:** 2026-05-05
**Status:** chosen (confirmed by human)
**Context:** WU-01 spec flags this for human decision. A voting platform derives trust from openness.
**Options considered:**
1. MIT — permissive; allows closed-source forks; simpler legally.
2. AGPL-3.0-only — copyleft; requires derivative network services to open-source; aligns with election-integrity trust goals.
**Chose:** AGPL-3.0-only
**Why:** Prevents closed-source forks from free-riding on the codebase without contributing back. Human confirmed this choice.
**Trade-offs accepted:** Restricts commercial embedding; may require legal review for enterprise use.
**Affected files:** `LICENSE`, all `package.json` files (license field)
**Reversibility:** medium — grep-replaceable if decision is reversed.

## D-2: NestJS platform adapter (Fastify vs Express)

**Date:** 2026-05-05
**Status:** chosen
**Context:** NestJS supports both Express and Fastify adapters; WU-01 installs the API scaffold.
**Options considered:**
1. Express — NestJS default; widest middleware ecosystem.
2. Fastify — 2–3× faster; built-in JSON schema validation; fully typed.
**Chose:** Fastify
**Why:** Vote-close events create short burst load; Fastify throughput advantage is meaningful. Fastify's built-in schema validation aligns with the typed-API approach.
**Trade-offs accepted:** Fastify middleware is not Express-compatible; some Express-specific packages require wrappers.
**Affected files:** `apps/api/package.json`, `apps/api/src/main.ts`
**Reversibility:** easy — swap adapter and update `main.ts`.

## D-3: Mobile build script as no-op stub in WU-01

**Date:** 2026-05-05
**Status:** chosen
**Context:** `expo export` requires Expo configuration and potentially EAS account setup. Running it in WU-01 CI would require secrets not yet established.
**Options considered:**
1. Run `expo export` — full build from day one; catches mobile breakage early.
2. No-op stub — placeholder; mobile build gated to WU-27/WU-33.
**Chose:** No-op stub
**Why:** Expo's build toolchain (EAS, signing certificates) is not established until WU-27 and WU-33. Forcing it in WU-01 makes CI fragile.
**Trade-offs accepted:** `turbo run build` does not validate mobile JS bundle until WU-27.
**Affected files:** `apps/mobile/package.json` (build script)
**Reversibility:** easy — change build script in WU-27.

## D-4: TypeScript moduleResolution for backend (Node16 vs Bundler)

**Date:** 2026-05-05
**Status:** chosen
**Context:** TypeScript 5.x offers both Node16 and Bundler module resolution strategies.
**Options considered:**
1. Node16 — correct for server-side Node.js; validates that imports have explicit extensions.
2. Bundler — correct for webpack/vite/Metro bundled code; allows extensionless imports.
**Chose:** Node16 for `apps/api` and `packages/` shared libs; Bundler for `apps/web` (Next.js).
**Why:** NestJS runs in plain Node.js, not a bundler. Using Bundler resolution for server code hides real import errors. React Native Metro doesn't support ESM so uses CommonJS + Node16.
**Affected files:** `packages/tsconfig/base.json`, `packages/tsconfig/react.json`
**Reversibility:** easy — change moduleResolution in tsconfig.

## D-5: ESLint flat config format (v9 flat vs legacy .eslintrc)

**Date:** 2026-05-05
**Status:** chosen
**Context:** ESLint v9 made flat config (`eslint.config.js`) the default; legacy `.eslintrc` still works but is deprecated.
**Options considered:**
1. Flat config (v9) — future-proof; required for latest ESLint; every app gets `eslint.config.js`.
2. Legacy `.eslintrc` — wider existing ecosystem; many plugins still only document legacy format.
**Chose:** Flat config (v9)
**Why:** Starting fresh; no legacy migration cost. Using current stable format from day one avoids a future migration. Most major plugins have added flat config support.
**Trade-offs accepted:** Some older plugins may require shims. WU-01 must document this so future WUs don't accidentally create `.eslintrc` files.
**Affected files:** All `eslint.config.js` files, `packages/eslint-config/` exports
**Reversibility:** medium — would need to rewrite all eslint.config.js files.
