# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from the repo root (`voting-bloc/`).

```bash
# Full CI (what PRs must pass)
make ci                          # install + lint + typecheck + build + test

# Individual tasks
pnpm turbo run build
pnpm turbo run lint
pnpm turbo run typecheck
pnpm turbo run test
pnpm run format                  # Prettier write
pnpm run format:check            # Prettier check (CI)

# Single package
pnpm --filter @voting-bloc/api test
pnpm --filter @voting-bloc/contracts test   # runs jest (not forge)

# Contracts (Foundry)
make forge-build                 # cd packages/contracts && forge build
make forge-test                  # forge test --fuzz-runs 10000
cd packages/contracts && forge test --match-test testFunctionName -vvv

# Mobile
pnpm --filter @voting-bloc/mobile run ios
pnpm --filter @voting-bloc/mobile run android
```

Local dev infra (Postgres, Redis, IPFS, Anvil) is added in WU-03 — `make dev-up` / `make dev-down` are stubs until then.

## Architecture

**Stack:** Turborepo + pnpm monorepo. Node ≥20, pnpm 9.15.0.

| Layer | Tech | Package |
|-------|------|---------|
| API | NestJS 10 + Fastify | `apps/api` |
| Web | Next.js 15 + React 19 | `apps/web` |
| Mobile | React Native 0.74 + Expo bare | `apps/mobile` |
| Contracts | Foundry / Solidity | `packages/contracts` |
| ZK circuits | Circom + Groth16 | `packages/circuits` |
| Identity (self-custody) | Semaphore | `packages/identity` |
| Identity (managed default) | Threshold MPC (vendor TBD in WU-46) | `packages/identity-managed` |
| Prover (browser/Node) | snarkjs WASM | `packages/prover-wasm` |
| Prover (mobile) | Native module bridge | `packages/prover-native` |
| Indexer | The Graph | `subgraph/` |
| Infra | Terraform on AWS / EKS | `infra/` |

**Chain:** Base Sepolia (MVP) → Base mainnet. **ZK:** Groth16 (smaller proofs, lower verifier gas).

**Vote-cast critical path:**
1. Voter selects option → device derives Semaphore identity → generates Groth16 proof + nullifier
2. Gasless path: proof POSTed to `/votes/{id}/proofs` → relayer calls `Vote.castBallot(option, proof, nullifier)` on-chain
3. Contract calls Semaphore Verifier, checks nullifier unused, mints soulbound ballot NFT to itself, emits `BallotCast(nullifier, option)`
4. The Graph indexes the event; API reads tally from the subgraph

**Contract hierarchy:** `Treasury` (issuer balances, authorizes votes) → `VoteFactory` (deploys `Vote` instances) → `Vote` (ERC-721 soulbound ballots, calls `SemaphoreVerifier`)

## WU workflow

Work is organized as 54 Work Units (WUs) across 9 phases. **One agent per WU, one PR per WU.**

- Branch naming: `wu-XX-slug`
- PR title must include WU ID: `[WU-XX] Title`
- PRs squash-merge to `main`; `main` is always deployable

**Required docs — non-negotiable:**

| File | Purpose | When to update |
|------|---------|----------------|
| `docs/PROJECT-STATUS.md` | Dashboard of all WUs | Session open + close |
| `docs/wu/wu-XX/STATUS.md` | Live progress tracker with TL;DR, in-progress, next steps | After every commit |
| `docs/wu/wu-XX/DECISIONS.md` | Append-only decision log | Before implementing each non-trivial decision |
| `docs/wu/wu-XX/AS-BUILT.md` | Closing summary for downstream WUs | At WU close |

**At session open:** read `PROJECT-STATUS.md` → read WU's `STATUS.md` → append opening session-log entry.
**At session close:** update STATUS TL;DR → append closing session-log entry → commit and push docs even if code is incomplete.

See `build-plan/00-foundations.md` § A.8 for the full resumption protocol and doc templates.

## Conventions

**TypeScript:** `strict: true` everywhere. ESLint + Prettier from `packages/eslint-config` / `packages/tsconfig`.

**Commits:** Conventional Commits format.

**Coverage gates (CI blockers):**
- Contracts: ≥95% line, 100% branch
- Backend API: ≥85% line
- SDK / identity packages: ≥90% line
- Web / mobile: ≥70% on logic; snapshot tests for components

**Errors:** No silent catches. Every catch re-throws with context or logs at WARN+ with a correlation ID. Scripts exit non-zero on failure — never silently retry.

**Secrets:** Never committed. Local dev uses `.env.local` (gitignored) seeded from `.env.example`. CI uses GitHub OIDC → AWS IAM → Secrets Manager.

## Hard invariants

These are release-blockers — PRs violating them are reverted on sight:

1. **No on-chain PII.** Voter rosters, KYC, and billing data stay off-chain, encrypted at rest.
2. **No wallet-to-voter mapping.** No system-controlled store can reconstruct the link between a wallet address and a voter identity. Adding `voter_id` columns to ballot-adjacent tables or logging a user identifier alongside a nullifier violates this.
3. **Zero crypto vocabulary in default voter UI.** Words banned from any screen a default-mode voter sees: "wallet," "gas," "transaction," "chain," "block," "token," "NFT," "proof," "nullifier," "smart contract," "blockchain," "USDC," "ETH," "address." Replacements: "account," "receipt code" (nullifier), "vote record" (ballot NFT), "verify on the public audit page." The public auditor and self-custody opt-in screens are the only exceptions. An automated linter (`tools/copy-lint/`) flags violations on PRs touching voter copy.
4. **Mainnet writes require 4-eyes.** CI builds calldata; a human reviews the Tenderly trace; multisig executes. No hot-keyed mainnet writes from CI.
