# 🧱 Microservice Layout
```text
fresh-recipes/
├── apps/
│   └── api/
│       ├── src/
│       │   ├── server.ts
│       │   └── __tests__/
│       │       └── health.test.ts
│       ├── package.json
│       └── tsconfig.json
│
├── packages/
│   └── utils/
│       ├── src/
│       │   ├── sum.ts
│       │   └── sum.test.ts
│       ├── package.json
│       └── tsconfig.json
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── turbo.json
├── jest.config.ts
├── tsconfig.json
└── pnpm-workspace.yaml
```
## Notes
- Each `apps/` folder represents a deployable service.
- Each `packages/` folder provides shared logic.
- Tests sit beside code in `__tests__` directories.
