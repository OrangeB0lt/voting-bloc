# Voting Bloc

Decentralized voting platform — Revision 4.

## First clone

```bash
# 1. Enable corepack and activate pnpm
corepack enable && corepack prepare pnpm@9.15.0 --activate

# 2. Install dependencies
pnpm install

# 3. Install Foundry (required for contracts)
curl -L https://foundry.paradigm.xyz | bash && foundryup

# 4. Build all packages
pnpm turbo run build

# 5. Run lint, typecheck, and tests
make ci
```

All packages should build with zero errors.

## Development

Local dev stack (Postgres, Redis, IPFS, Anvil) setup is documented in `infra/local/README.md` and added in WU-03.

## Architecture

- `build-plan/00-foundations.md` — design decisions, repo layout, conventions
- `docs/adr/` — Architecture Decision Records
- `docs/PROJECT-STATUS.md` — live WU dashboard

## Project status

See [docs/PROJECT-STATUS.md](docs/PROJECT-STATUS.md).
