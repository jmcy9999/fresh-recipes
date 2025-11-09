# 🧩 Project Overview

**Fresh Recipes** is a production-grade TypeScript microservices application built with **Fastify**, **Turborepo**, and **pnpm**.

## Goals
- Demonstrate API-first, test-driven microservice development.
- Maintain strong CI/CD discipline with parallel pipelines and caching.
- Serve as a scalable template for real product deployment to AWS ECS.

## Architecture Summary
- **Monorepo** managed with Turborepo.
- **Apps** in `apps/` (each a deployable microservice).
- **Shared packages** in `packages/`.
- **Common tooling**: Jest, TypeScript, pnpm, Turbo.

## Current State
- ✅ Monorepo structure and CI/CD complete.  
- ✅ Unit and integration tests passing.  
- 🟡 `/recipes` API development in progress.
