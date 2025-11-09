# ⚙️ CI/CD Pipeline Overview

## GitHub Actions Workflow
File: `.github/workflows/ci.yml`

### Triggers
- Push to `develop` or `main`
- Pull requests targeting `develop` or `main`

### Steps
1. **Checkout code**
2. **Setup Node + pnpm**
3. **Install dependencies**
4. **Restore Turbo & pnpm caches**
5. **Build (Turbo filtered)**
6. **Test (per-package, Jest)**

### Matrix Jobs
Runs in parallel for:
- `./apps/api`
- `./packages/utils`

### Caching
- Turbo build cache (`.turbo`)
- pnpm store (`~/.pnpm-store`)

### Branch Protection
- `develop` → staging branch
- `main` → production branch
- CI must pass before merge.
