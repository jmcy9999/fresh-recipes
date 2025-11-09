# 🧭 System Architecture – Fresh Recipes

This diagram shows how the **Fresh Recipes** platform fits together:  
from monorepo to CI/CD, then out to AWS infrastructure (planned in future phases).

```mermaid
flowchart TD
    subgraph Dev["👩‍💻 Developer Environment (macOS)"]
        IDE["VSCode / JetBrains IDE"]
        PNPM["pnpm Workspaces"]
        Turbo["Turborepo (build/test orchestration)"]
        IDE --> PNPM --> Turbo
    end

    subgraph Repo["🏗️ Monorepo Structure"]
        API["apps/api (Fastify)"]
        Utils["packages/utils"]
        Shared["jest.config.ts / turbo.json"]
        API --> Shared
        Utils --> Shared
    end

    Dev --> Repo

    subgraph CI["🔁 GitHub Actions CI/CD"]
        Checkout["Checkout + Install deps"]
        Cache["Turbo + pnpm Cache"]
        Matrix["Matrix Jobs (API, Utils)"]
        Jest["Jest Tests"]
        Build["Turbo Build"]
        Deploy["Deploy (staging/prod - future)"]
        Checkout --> Cache --> Matrix --> Jest --> Build --> Deploy
    end

    Repo --> CI

    subgraph Cloud["☁️ AWS Infrastructure (planned)"]
        ECS["ECS Fargate Services"]
        PG["PostgreSQL (RDS)"]
        S3["S3 Object Storage"]
        Logs["CloudWatch + OpenTelemetry"]
        ECS --> PG
        ECS --> S3
        ECS --> Logs
    end

    CI --> Cloud

    subgraph Obs["📊 Observability (Phase 6)"]
        Grafana["Grafana Dashboards"]
        Prometheus["Prometheus Metrics"]
        OTEL["OpenTelemetry Traces"]
        Grafana --> Prometheus
        Prometheus --> OTEL
    end

    Cloud --> Obs
```


## 🧱 Architecture Layers

| **Layer** | **Primary Components** | **Key Responsibilities** | **Example Technologies** |
|:-----------|:-----------------------|:--------------------------|:--------------------------|
| **Developer Environment** | Local tools (VS Code, pnpm, Turbo) | Rapid local dev and test, one-command bootstrap | macOS Terminal, pnpm v9, Turborepo v2 |
| **Monorepo Structure** | `apps/` (services), `packages/` (libs) | Code organisation, dependency sharing, consistent lint/test/build pipelines | TypeScript 5, Fastify, Jest, Prettier |
| **Continuous Integration / Delivery (CI/CD)** | GitHub Actions, Turbo caching | Automated build/test per workspace, matrix parallelism, deploy gates | GitHub Actions, Turbo CLI, pnpm cache |
| **Cloud Infrastructure (Phase 05)** | AWS ECS Fargate, RDS (PostgreSQL), S3, SSM Secrets | Container orchestration, persistent storage, environment isolation | Terraform + AWS Provider |
| **Observability & Ops (Phase 06)** | Pino logs, OpenTelemetry, Prometheus, Grafana | Centralised logging, metrics, tracing, SLO dashboards | OTEL SDK, Prometheus Operator, Grafana Cloud |
| **Developer Experience & Automation (Phase 07)** | Prettier, ESLint, Husky, Commitlint | Consistent code style, local checks, automated pre-commit validation | Node tools, Husky hooks |
| **Security & Compliance (Phase 09)** | IAM roles, Secrets Manager, dependency scanners | Least-privilege access, supply-chain integrity, compliance checks | AWS IAM, Dependabot, Trivy |
| **Performance & Cost Optimisation (Phase 10)** | Load testing, caching layers, autoscaling policies | Maintain performance under load while optimising AWS spend | k6, AWS Auto Scaling, CloudWatch Metrics |
| **Productisation & Docs (Phase 11)** | Swagger UI, Confluence/Markdown docs | API documentation, onboarding, changelogs | @fastify/swagger, MkDocs, GitHub Pages |

Next planned diagram updates:
	•	Add service-to-service messaging (SNS/SQS or NATS)
	•	Add Terraform modules (Phase 5)
	•	Add network topology (VPC, ALB, private subnets) in Phase 6
