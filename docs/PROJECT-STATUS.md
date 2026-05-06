# Project Status

**Last updated:** 2026-05-05 by WU-01 agent (close-out session)

## Active WUs

| WU | Title | Branch | Status | Last update | Link |
|----|-------|--------|--------|-------------|------|
| WU-01 | Monorepo bootstrap | wu-01-bootstrap | awaiting-review | 2026-05-05 | [STATUS](./wu/wu-01/STATUS.md) |

## Done

(none yet — WU-01 pending PR merge)

## Not started

WU-02, WU-03, WU-04, WU-05, WU-06, WU-07, WU-08, WU-09, WU-10, WU-11,
WU-12, WU-13, WU-14, WU-15, WU-16, WU-17, WU-18, WU-19, WU-20, WU-21,
WU-22, WU-23, WU-24, WU-25, WU-26, WU-27, WU-28, WU-29, WU-30, WU-31,
WU-32, WU-33, WU-34, WU-35, WU-36, WU-37, WU-38, WU-39, WU-40, WU-41,
WU-42, WU-43, WU-44, WU-45, WU-46, WU-47, WU-48, WU-49, WU-50, WU-51,
WU-52, WU-53, WU-54

> WU-02 (Shared configs and domain types) and WU-03 (Local dev infra) are unblocked
> once WU-01 merges — start them in parallel on separate branches from `main`.

## Blockers across the project

- [HUMAN DECISION RESOLVED] License: AGPL-3.0-only confirmed.
- [HUMAN DECISION NEEDED] Appendix D open questions — lock before the WU that needs each one starts:
  - Working name (replace `voting-bloc` globally)
  - Branding palette (placeholder ships in WU-21; final swap is one CSS variable)
  - Eligibility claim flow Option A vs B (recommendation: A — eager tree, claim-then-vote with deadline)
  - Cross-platform mobile UI library (`tamagui` vs `gluestack`) — lock before WU-27
  - Single-region vs multi-region at MVP — lock before WU-34 (recommendation: single primary + warm replica)
  - Native vs Expo dev client — lock before WU-27 (recommendation: native — need native modules)
  - Managed-identity vendor (Privy vs Web3Auth) — lock before WU-46
  - Auth aggregator (Auth0 vs WorkOS vs Clerk) — lock before WU-14 (recommendation: WorkOS)
  - Fiat on-ramp (Coinbase Commerce vs Circle Mint vs Stripe USDC) — lock before billing WUs
