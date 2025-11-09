# 👩‍💻 Developer Onboarding

## Prerequisites
- Node.js v20+
- pnpm v9+
- Git
- macOS or Linux (native shell)

## Clone and install
```bash
git clone git@github.com:jmcy9999/fresh-recipes.git
cd fresh-recipes
pnpm install
```

## Verify Setup
```bash
pnpm test
```
You should see both test suites pass.

## Run the API locally
```bash
pnpm --filter @fresh/api dev
```
Visit http://localhost:3000/health → { "status": "ok" }

## Folder structure
apps/api           - Fastify microservice
packages/utils     - Shared utility library
docs               - Documentation



