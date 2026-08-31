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

## 2026-08-31 09:00 Europe/London — Source recovery investigation

**Starting main:** `1149d22ff410501c21021a1bd82d0842abfb8c57`  
**Repository/history evidence:** commit history was inspected back to the initial MVP upload. The initial commit `4246357` contains a readable single-file HTML/CSS/JavaScript MVP. The later V2 commit `ef2e7c1` still shows readable application source in `index.html`. By commit `3939b2d` (`Publish reviewed VIP build for Loren`) the deployment changes to hashed compiled CSS/JavaScript assets, and subsequent July commits continue publishing compiled assets. Repository code search finds no `package.json`, and the connected account exposes no second VIP source repository.  
**Interpretation:** there is recoverable historical *behavioural/source evidence*, but no durable modern source project corresponding to the current compiled deployment. The source loss boundary is therefore narrowed: maintainable source existed in the early single-file implementation, while the later React-style compiled deployment was published without its source/build/test tree.  
**Active lanes:** Architecture; Reliability / Recovery; Documentation / Contracts; Release Management.  
**Observable concurrency:** one connected execution context; no independent sub-agent/worker execution observable.  
**Loops:** 1 source-recovery investigation loop completed; 0 application implementation loops; 0 repair cycles.  
**Tests / CI / regression:** none claimed because the modern source/build harness is still absent.  
**Checkpoint usefulness:** useful independent progress; narrowed the recovery problem from "source missing" to a specific historical transition and identified a readable fallback baseline.

**Finding F-20260831-03 — HIGH**  
**Area:** architecture / recovery / provenance  
**Evidence:** `4246357` and `ef2e7c1` expose readable application logic in `index.html`; `3939b2d` and later deployment commits expose hashed compiled assets; no `package.json` or modern source tree is present on current `main`, and no alternate connected VIP repository is visible.  
**Risk:** treating the early single-file MVP as if it were the exact source for the current deployed app would silently discard later functionality; treating the minified current bundle as maintainable source would undermine deterministic testing and review.  
**Required evidence or repair:** re-establish a maintainable source project using (a) current deployed behaviour as the behavioural reference, (b) readable historical MVP logic as provenance/reference, and (c) approved durable product decisions as requirements. Do this as an explicit recovery/rebuild task with parity tests before new feature work.  
**Disposition:** OPEN; recovery path is now defined but not yet implemented.  
**Repair commit/artefact:** this audit entry plus historical commits `4246357`, `ef2e7c1`, `3939b2d`.  
**Reviewer recheck:** PENDING rebuilt source + parity evidence.

**Ordered next work:** (1) inventory current deployed behaviours from compiled/static app without modifying bundles; (2) inventory readable historical pay/shift logic and approved product contracts; (3) create a maintainable source/build/test project on an isolated recovery branch; (4) establish deterministic parity/golden tests for existing behaviour before adding new functionality; (5) adversarially review the recovery diff for lost functionality/privacy/pay-rule assumptions; (6) only merge after build/test/recovery evidence passes.  
**Decisions / user evidence:** no new product-owner decision required. Source re-establishment is an engineering prerequisite; no new pay/tax assumption is authorised by this recovery work.  
**Code metrics:** merged application-code delta 0; documentation-only recovery evidence added. Historical compiled/minified LOC intentionally excluded.  
**Non-code output:** source provenance map, recovery boundary, explicit rebuild strategy, third contemporaneous Markdown checkpoint under the new audit standard.  
**Exact continuation reason:** meaningful safe recovery work remains; implementation should proceed through an isolated auditable recovery branch rather than feature-editing compiled assets.  
**Observable platform restriction:** none observed.  
**Agent execution truth:** planner, architecture/recovery and sceptical-review roles were logical serial roles in one observable execution context. No claim of independently running sub-agents is made.

## 2026-08-31 12:00 Europe/London — Recovery execution checkpoint

**Starting main:** `dbca0f150ba85d52ccebe5c06e7b8f467ff0222b`  
**Execution:** created isolated branch `factory/source-recovery`, committed `docs/factory/recovery/SOURCE_RECOVERY_PLAN.md` and `docs/factory/recovery/BEHAVIOUR_INVENTORY.md`, and opened draft PR #1 (`Recovery: re-establish maintainable VIP source baseline`). The PR is intentionally draft and explicitly barred from merge until maintainable source, reproducible build/tests, behavioural parity, persistence/recovery, mobile compatibility and adversarial-review evidence are present.  
**Evidence progress:** historical readable MVP behaviour has been classified rather than blindly copied. The inventory explicitly identifies hard-coded £17/hour, Saturday/Sunday/night premiums and lowest-paid-segment break deduction as Loren-prototype/legacy assumptions that must not become generic employer defaults merely because they existed in old code. The recovery plan adds exact-money, Europe/London DST, local-first privacy, versioned persistence, Android Chrome/iPhone Safari and responsive tablet/desktop success gates.  
**Active lanes:** Architecture; Reliability/Recovery; Documentation/Contracts; Product/Pay-rule provenance; Release Management.  
**Observable concurrency:** one connected execution context; logical roles serial only.  
**Loops:** 1 recovery planning/execution loop completed; 0 source implementation loops completed; 0 repair cycles.  
**Tests / CI / regression:** no application test/build result claimed yet. This checkpoint deliberately creates the auditable recovery workspace and behavioural contract before source implementation.  
**Checkpoint usefulness:** created independent progress: recovery is now an isolated, inspectable draft PR rather than an intention living only in checkpoint prose.  
**PR state:** draft PR #1, head `32b3351a2dd51ad2828938a68826b3ada0885a2b`, 2 documentation files, 126 additions, 0 deletions; not merge-ready.  
**Code metrics:** merged application-code delta 0. Recovery-branch additions are documentation and are not counted as production/test LOC.  
**Non-code outputs:** executable recovery plan; provenance-aware behaviour inventory; isolated recovery branch; draft PR with explicit merge gate.  
**Adversarial finding F-20260831-04 — HIGH**  
**Area:** pay-rule provenance / correctness  
**Evidence:** initial readable MVP hard-codes base rate and premium multipliers and deducts unpaid break time from the lowest-paid segment.  
**Risk:** source reconstruction could accidentally turn Loren-specific prototype assumptions into generic employer rules, violating the approved unknown-rule policy and creating confident but wrong pay forecasts for later users.  
**Required evidence or repair:** recovered domain must represent employer pay/break rules as explicit configuration/unknown; historical constants may be retained only as validated Loren configuration evidence, not product defaults. Golden tests must distinguish legacy parity fixtures from generic behaviour.  
**Disposition:** OPEN; prevention requirement is now explicit in recovery plan/inventory.  
**Reviewer recheck:** PENDING domain implementation/tests.  
**Ordered next work:** (1) inspect later compiled deployment enough to complete dashboard/profile/calendar/backup behaviour inventory; (2) create framework-independent exact-money pay-domain skeleton and legacy golden fixtures on recovery branch; (3) add deterministic test/build harness; (4) add versioned persistence contract; (5) rebuild UI only after domain/persistence gates; (6) perform read-only adversarial review before PR leaves draft.  
**Decisions / user evidence:** no new product-owner decision required.  
**Exact continuation reason:** recovery implementation remains meaningful and safe on isolated branch; `main` remains untouched.  
**Observable platform restriction:** none observed.  
**Agent execution truth:** this checkpoint used one observable execution context. No independently running sub-agent is claimed.
