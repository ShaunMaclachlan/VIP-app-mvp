# VIP Factory Audit Trail

## Purpose

This file is the durable, human-readable audit trail for the VIP autonomous factory. It exists so product-owner check-ins are backed by inspectable repository evidence rather than narrative claims that cannot be independently checked.

## Factory evidence contract

Every material factory task must leave a durable record here (or link to a dedicated review/checkpoint file) covering:

1. **Task / lane / value gate** — what was attempted, why it was the highest-value safe work, and explicit success criteria.
2. **Execution evidence** — branch/PR/commit or non-code output, plus deterministic checks or source-quality verification.
3. **Adversarial review** — read-only sceptical findings with severity and evidence. Reviewer findings must be distinguishable from builder work.
4. **Repair cycle** — what changed in response to each accepted finding. Maximum three executor-review-repair cycles per task.
5. **Release / handoff** — merge decision, CI/regression state, rollback/recovery evidence where relevant, and resulting main SHA.
6. **Capacity observation** — only observable platform warnings/restrictions, review burden, repair cycles, and whether another useful task could start. Never invent token or reset telemetry.
7. **Agent execution truth** — record whether work used genuinely separate workers/execution contexts or logical roles performed serially. Do not imply independent agents where none were observable.

## Finding format

Each material review finding should use this structure:

```text
Finding <ID> — <HIGH|MEDIUM|LOW>
Area: <architecture|correctness|pay-rule|persistence|migration|security|privacy|UX|testing|research|other>
Evidence: <specific file/test/source/behaviour>
Risk: <what could go wrong>
Required evidence or repair: <what would resolve it>
Disposition: <OPEN|FIXED|REJECTED-WITH-REASON|BLOCKED>
Repair commit/artefact: <SHA/path/PR if applicable>
Reviewer recheck: <PASS|FAIL|PENDING>
```

## Checkpoint format

Every factory invocation should append or link a checkpoint recording:

- Europe/London checkpoint time
- starting and ending main SHA
- open/merged/blocked PRs
- active lanes and observable peak concurrency
- loops started/completed/blocked and repair-cycle counts
- tests, CI, regression and batch architecture review results
- ordered next-work queue
- decisions resolved/approaching and user-evidence needs
- code metrics for merged first-party production/test code where reproducibly available
- non-code outputs and evidence gathered
- checkpoint usefulness: rescued idle work / found active work / created independent progress / no useful resumption
- exact continuation or stop reason
- observable platform restriction, or `none observed`

## Product-owner visibility rule

Routine `VIP FACTORY CHECK-IN` summaries must be traceable to this audit trail, PRs, tests, CI or linked evidence. Material claims such as "adversarial review rejected X" must have an inspectable finding recorded here or in a linked factory review file.

## Historical note

This contract was established on 2026-08-30 after the product owner identified that previous factory check-ins described planner/executor/reviewer challenges without providing an adequate durable, user-visible record in the repository. Earlier narrative summaries should therefore not be treated as equivalent to the evidence standard defined here.

---

# Audit entries

## 2026-08-30 — Auditability contract established

**Lane:** Documentation / Contracts + Factory Governance  
**Trigger:** Product-owner direction that factory challenges, reviewer findings and repairs require a durable trail and Markdown documentation.  
**Outcome:** This audit-trail contract was added to the repository. Future material factory loops must record inspectable evidence under this standard.  
**Agent execution truth:** This documentation change was performed directly through the connected GitHub repository; no claim is made that a separate autonomous reviewer worker independently executed this documentation task.  
**Next:** Apply the contract prospectively to active implementation/review work and link future human-facing check-ins to durable evidence.

## 2026-08-31 03:00 Europe/London — Watchdog checkpoint

**Starting main:** `c54f0a572ed4098a57d5e1325ddad9a6c1469f82`  
**Repository observation:** GitHub reports only the `main` branch and no open pull requests. The immediately preceding durable commit is the auditability-contract commit. This conflicts with earlier conversational factory summaries that referred to PR #69 and a later application state; those claims are not present in the connected repository and are therefore not accepted as durable source-of-truth evidence.  
**Active lanes:** Documentation / Contracts; Reliability / Ops; Release Management.  
**Observable concurrency:** one connected execution context; no separate sub-agent/worker execution is observable in this checkpoint.  
**Loops:** 1 evidence/reconciliation loop started and completed; 0 implementation loops claimed; 0 repair cycles.  
**Tests / CI / regression:** no application-code change made in this checkpoint, therefore no new application test or CI result is claimed.  
**Checkpoint usefulness:** rescued source-of-truth integrity by detecting a mismatch between prior narrative factory reporting and the actual connected GitHub repository.  
**Finding F-20260831-01 — HIGH**  
**Area:** reliability / auditability  
**Evidence:** connected GitHub currently exposes only `main`; open PR collection is empty; current head is the audit-trail commit.  
**Risk:** continuing from conversational claims about unpersisted PRs/commits could fabricate progress, duplicate work, or cause the factory to make release decisions against a repository state that does not exist.  
**Required evidence or repair:** treat connected GitHub durable state as authoritative; future implementation/review claims must be backed by a branch/PR/commit/test/CI artefact in this repository before being reported as completed.  
**Disposition:** FIXED for orchestration policy; historical application-progress discrepancy remains explicitly unverified rather than reconstructed.  
**Repair commit/artefact:** this audit entry.  
**Reviewer recheck:** PASS for evidence policy; no claim made about the missing historical implementation.  
**Ordered next work:** (1) re-establish the actual application baseline from `main`; (2) inspect roadmap/decision documentation that exists durably; (3) select the highest-value approved MVP task from that evidence; (4) implement only through an isolated branch/PR with tests and a contemporaneous Markdown review trail.  
**Decisions / user evidence:** no product-owner decision required for this integrity correction.  
**Code metrics:** merged application-code delta 0; documentation-only checkpoint.  
**Non-code output:** source-of-truth reconciliation and durable audit finding.  
**Exact continuation reason:** meaningful safe work remains, but application implementation must restart from the actual durable repository baseline rather than unverified conversational state.  
**Observable platform restriction:** none observed.  
**Agent execution truth:** this checkpoint used logical orchestration/reviewer roles serially in one observable execution context; no claim of independent sub-agents is made.

## 2026-08-31 06:00 Europe/London — Baseline reconstruction checkpoint

**Starting main:** `418da14b6bb05bcd2dbcf5e2a6961504cbf22fba`  
**Repository observation:** source-of-truth inspection confirms the repository is currently a compiled static web-app deployment rather than a maintainable source tree: root contains `index.html`, `assets/`, and `docs/`; `index.html` loads hashed compiled JavaScript/CSS from `assets/`. GitHub exposes only `main` and no open PRs. There is no root README/package/source/test tree visible in the connected durable baseline.  
**Active lanes:** Architecture; Reliability / Ops; Documentation / Contracts; Release Management.  
**Observable concurrency:** one connected execution context; no independent sub-agent execution observable.  
**Loops:** 1 baseline reconstruction/adversarial architecture loop completed; 0 application implementation loops; 0 repair cycles.  
**Tests / CI / regression:** no maintainable source/test harness is present in the connected baseline, so no truthful application test run is claimed. Existing compiled deployment assets were inspected only.  
**Checkpoint usefulness:** converted the prior generic source-of-truth discrepancy into a concrete architecture/recovery diagnosis.

**Finding F-20260831-02 — HIGH**  
**Area:** architecture / reliability / recovery  
**Evidence:** repository root contains only compiled deployment artefacts (`index.html`, hashed JS/CSS under `assets/`) plus factory documentation; branch list contains only `main`; no open PRs; no maintainable application source/test/package tree is visible.  
**Risk:** editing minified compiled assets directly would destroy reviewability, testability and migration confidence. It would also make the factory's required planner/executor/reviewer/release loop largely theatrical because deterministic source-level verification is unavailable.  
**Required evidence or repair:** recover or re-establish the maintainable source tree before feature development. Search durable history/other accessible refs or repositories for the source project; if recoverable, restore it through an auditable branch/PR. If not recoverable, rebuild from the deployed behaviour and approved product contract as a dedicated recovery task rather than silently modifying bundles.  
**Disposition:** OPEN. The safe orchestration response is to avoid feature edits to compiled assets and prioritize source recovery/re-establishment.  
**Repair commit/artefact:** this audit entry; no application-code repair claimed.  
**Reviewer recheck:** PENDING source recovery.

**Ordered next work:** (1) search accessible repository history and installed repositories for maintainable VIP source; (2) identify the last trustworthy source baseline and its relationship to the deployed bundle; (3) restore/re-establish source + deterministic test/build harness through an auditable change; (4) only then resume approved MVP feature work; (5) preserve the newly established Markdown trail for every material loop.  
**Decisions / user evidence:** no product-owner decision required yet; source recovery is an engineering/reliability prerequisite within the approved direction.  
**Code metrics:** merged application-code delta 0; documentation-only checkpoint. Compiled/minified bundle size is not reported as first-party LOC because it would be a misleading vanity metric.  
**Non-code output:** concrete maintainability/recovery diagnosis and ordered recovery queue.  
**Exact continuation reason:** safe meaningful engineering work remains in source recovery; feature development is intentionally deferred until a maintainable baseline is recovered or re-established.  
**Observable platform restriction:** none observed.  
**Agent execution truth:** logical architecture/reliability/reviewer roles were performed serially in one observable execution context; no independent sub-agent is claimed.
