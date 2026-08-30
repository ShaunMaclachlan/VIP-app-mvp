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
