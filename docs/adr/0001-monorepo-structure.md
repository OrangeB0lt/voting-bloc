# ADR-0001: Monorepo structure with Turborepo and pnpm workspaces

**Date:** 2026-05-05
**Status:** Accepted
**Deciders:** Build plan + WU-01 agent

## Context

The voting-bloc platform spans five application surfaces (web, mobile, API, contracts, circuits)
and twelve shared packages. We need a build orchestration strategy that:

1. Allows packages to share TypeScript types and configs without publishing to npm.
2. Provides task-level caching to keep CI fast as the repo grows.
3. Lets WU-02 through WU-54 be worked on in parallel without conflicts.
4. Works with Foundry (Rust binary) alongside Node tooling.

## Decision

Use Turborepo as the task runner and pnpm workspaces as the package manager.

## Consequences

**Positive:**
- Turborepo's content-hash cache means unchanged packages are never rebuilt.
- pnpm's symlink strategy avoids duplicating `node_modules` across packages.
- `pnpm-workspace.yaml` defines the full package graph in one file.
- `dependsOn: ["^build"]` expresses topological build order declaratively.

**Negative:**
- Foundry (Rust binary) is not a first-class Turbo task — it is wrapped in a `package.json` script.
- Agents must understand both Turborepo and pnpm workspace concepts.

## Alternatives considered

1. Nx — similar capability but heavier configuration.
2. Lerna + npm workspaces — legacy; Lerna v7+ uses Nx under the hood.
3. Multiple repos — rejected; cross-package type sharing would require npm publishing.
