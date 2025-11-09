# ⚡ Turbo Caching in Fresh Recipes

## 🧠 What Turbo Caching Is

**Turborepo** provides an intelligent build and test cache.  
Whenever you run `pnpm turbo run <task>`, it records the **inputs** (source files, dependencies, environment variables) and the **outputs** (compiled files, test results).

If nothing relevant has changed since the last run, Turbo **skips** rebuilding or retesting and instead **restores results from cache** — either locally or from a shared remote store.

That means builds and tests that took minutes before can now complete in seconds.

---

## ⚙️ How It Works (Conceptually)

```mermaid
flowchart TD
    subgraph Dev["👩‍💻 Developer"]
        Code["Write Code"]
        Run["Run 'pnpm turbo run build/test'"]
    end

    subgraph Turbo["⚡ Turborepo Cache Engine"]
        Hash["Compute task hash (source + deps + env)"]
        Check["Check .turbo cache store"]
        Restore["Restore cached output if match"]
        Execute["Run task if no cache match"]
        Store["Save outputs to cache"]
        Hash --> Check
        Check -->|Cache hit| Restore
        Check -->|Cache miss| Execute --> Store
    end

    subgraph CI["🤖 GitHub Actions CI"]
        CacheRestore["Restore .turbo and pnpm caches"]
        TurboRun["Run Turbo tasks (build/test)"]
        CacheSave["Save .turbo and pnpm caches"]
        CacheRestore --> TurboRun --> CacheSave
    end

    Dev --> Turbo
    Turbo --> CI
 ```

## 🧩 Implementation in Fresh Recipes
Local Development
	•	Developers use Turbo CLI via scripts in package.json and the root turbo.json file.
	•	Each app (apps/api) and package (packages/utils) defines its own build/test scripts.
	•	Running:
```bash
    pnpm turbo run build
```
executes all builds once, then caches them.

## GitHub Actions (CI)

Turbo caching is enabled in the workflow file: .github/workflows/ci.yml
```yml
- name: Restore Turbo & pnpm caches
  uses: actions/cache@v4
  with:
    path: |
      .turbo
      ~/.pnpm-store
    key: ${{ runner.os }}-turbo-${{ hashFiles('**/pnpm-lock.yaml') }}
    restore-keys: |
      ${{ runner.os }}-turbo-

- name: Build (turbo, filtered)
  run: pnpm turbo run build --cache-dir .turbo --filter="${{ matrix.target }}"
```
The CI job restores the .turbo cache and reuses results from previous runs if inputs haven’t changed.

## 🔍 Why We Use It
| **Benefit** | **Description** |
|:-------------|:----------------|
| **Speed** | Developers and CI skip re-building identical code. |
| **Determinism** | Builds are reproducible — identical inputs always produce identical outputs. |
| **Parallelism** | Turbo executes independent tasks concurrently, maximising CPU usage. |
| **CI Efficiency** | Cached results mean most PRs test only what changed, reducing CI times dramatically. |
| **Cost Reduction** | Faster builds = fewer runner minutes and less cloud spend. |

## 🧮 How Cache Keys Work
Each Turbo task computes a hash from:
	•	All dependent source files
	•	Environment variables declared in turbo.json
	•	Task command and dependencies

If the hash matches a previously stored task, Turbo simply restores outputs.

## Cache Storage
| **Cache Type** | **Where It Lives** | **Use Case** |
|:----------------|:-------------------|:--------------|
| **Local cache** | `.turbo/` folder in repo | Developer’s machine (default) |
| **Remote cache (optional)** | Turborepo Cloud or S3-backed store | Shared cache between CI and dev machines |

Currently, Fresh Recipes uses local caching only.
Remote caching can be enabled later using:
```bash
pnpm dlx turbo login
```

## 📈 Measured Gains
Typical local savings:
| **Step** | **Cold Run** | **Warm Run (cached)** | **Speed-up** |
|:----------|:--------------|:----------------------|:--------------|
| `pnpm turbo run build` | ~20s | ~2s | 10× |
| `pnpm turbo run test` | ~12s | ~1s | 12× |

CI runs also skip rebuilding unchanged packages, improving PR feedback loops.

## 🔮 Future Enhancements
	•	Enable remote cache for full CI ↔ dev sync
	•	Add --filter=...[HEAD^1] to only rebuild changed workspaces
	•	Measure cache hit rates via Turbo telemetry
	•	Integrate with Nx Cloud (alternative) for richer build analytics

## Summary:
Turbo caching underpins Fresh Recipes’ fast feedback loop.
By avoiding redundant builds and tests, it keeps development tight, CI lean, and releases reliable.
