

# Turborepo starter
![CI](https://github.com/jmcy9999/fresh-recipes/actions/workflows/ci.yml/badge.svg)
[![codecov](https://codecov.io/gh/jmcy9999/fresh-recipes/branch/develop/graph/badge.svg?token=<optional_token>)](https://codecov.io/gh/jmcy9999/fresh-recipes)

### 🥗 Fresh Recipes
Fresh Recipes is a production-grade microservices application built with TypeScript, Fastify, and Turborepo.
It’s designed to demonstrate API-first, test-driven, CI/CD-automated microservice development using modern DevOps practices.

⸻
## 🚀 Project Overview
This repository is a monorepo containing all application services and shared libraries.

✅ Current Status
| **Area** | **Description** | **Status** |
|:----------|:----------------|:------------|
| **Architecture** | Turborepo monorepo (`apps/` + `packages/`) using pnpm workspaces | ✅ Complete |
| **Runtime** | Node.js (TypeScript, Fastify) | ✅ |
| **Testing** | Jest + ts-jest, 100% passing suite | ✅ |
| **CI/CD** | GitHub Actions with parallel matrix jobs per workspace | ✅ |
| **Caching** | Turbo incremental builds + pnpm store cache | ✅ |
| **Code Quality** | Prettier baseline + TypeScript strict mode | ✅ |
| **Next** | `/recipes` route, OpenAPI contract, staging deploy (AWS ECS) | 🟡 In progress |

## 🧱 Monorepo Structure
fresh-recipes/
├── apps/
│   └── api/                # Fastify microservice
│       ├── src/
│       │   ├── server.ts   # Fastify app with /health
│       │   └── __tests__/
│       │       └── health.test.ts
│       ├── package.json
│       └── tsconfig.json
│
├── packages/
│   └── utils/              # Shared utility library
│       ├── src/
│       │   ├── sum.ts
│       │   └── sum.test.ts
│       ├── package.json
│       └── tsconfig.json
│
├── .github/workflows/ci.yml   # GitHub Actions CI pipeline
├── turbo.json                 # Turbo pipeline definitions
├── jest.config.ts             # Shared Jest config
├── tsconfig.json              # Root TypeScript config
├── package.json               # Root scripts + workspace meta
└── pnpm-workspace.yaml        # Workspace globs

## ⚙️ Tooling
| **Tool** | **Purpose** |
|:-----------|:------------|
| **pnpm** | Fast, disk-efficient package manager |
| **Turborepo** | Orchestration, caching, parallel builds/tests |
| **TypeScript** | Typed language for all services |
| **Fastify** | Lightweight, high-performance web framework |
| **Jest + ts-jest** | Testing framework (unit & integration) |
| **GitHub Actions** | CI/CD pipeline |
| **Codecov** | Test coverage reporting |

## 🧩 Getting Started (macOS/Linux)
