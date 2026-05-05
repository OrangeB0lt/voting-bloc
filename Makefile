.PHONY: install dev test lint typecheck build clean ci dev-up dev-down forge-build forge-test

all: install build

install:
	pnpm install

build:
	pnpm turbo run build

dev: dev-up
	pnpm turbo run dev --parallel

lint:
	pnpm turbo run lint

typecheck:
	pnpm turbo run typecheck

test:
	pnpm turbo run test

clean:
	pnpm turbo run clean
	find . -name "*.tsbuildinfo" -delete
	find . -name ".turbo" -type d -exec rm -rf {} + 2>/dev/null || true

ci: install lint typecheck build test

forge-build:
	cd packages/contracts && forge build

forge-test:
	cd packages/contracts && forge test --fuzz-runs 10000

# Local dev infra (implemented in WU-03)
dev-up:
	@echo "WU-03: docker compose dev-up not yet implemented" && exit 0

dev-down:
	@echo "WU-03: docker compose dev-down not yet implemented" && exit 0
