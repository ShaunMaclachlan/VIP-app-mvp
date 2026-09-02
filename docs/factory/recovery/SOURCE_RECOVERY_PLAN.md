# VIP Source Recovery Plan

Status: **IN PROGRESS — recovery branch established**  
Branch: `factory/source-recovery`  
Baseline main: `dbca0f150ba85d52ccebe5c06e7b8f467ff0222b`

## Value gate

VIP feature development is unsafe while the connected repository contains only compiled deployment artefacts for the current application. The highest-value safe engineering task is therefore to re-establish maintainable source + deterministic tests without changing deployed `main` behaviour.

## Evidence inputs

1. Initial readable MVP commit `424635726f2432bd49d708301743f7cc7d389a9e` contains a complete single-file HTML/CSS/JavaScript implementation.
2. V2 commit `ef2e7c14906a580d4eeddd2090ec7796d2b4e735` contains later readable UI/application source evidence.
3. Commit `3939b2de3e923009a47a56ea01e5030a48cecd65` marks the transition to publishing hashed compiled assets without the maintainable source/build tree.
4. Current `main` compiled deployment remains the behavioural reference for later functionality that is not present in the early readable source.
5. Approved product contracts remain requirements, but recovery must not invent new employer/pay/tax rules.

## Success criteria

Recovery is not complete until all of the following are evidenced:

- maintainable first-party source exists separately from generated deployment assets;
- reproducible local build command exists;
- deterministic automated test command exists;
- pay calculations use integer pence or another demonstrably exact monetary representation at the domain boundary;
- Europe/London overnight/DST behaviour has explicit tests;
- current deployment behaviours are inventoried and either reproduced or explicitly recorded as intentionally superseded by an already-approved product direction;
- local persistence has a documented schema/version and recovery path;
- privacy remains local-first with no new transmission of personal/financial data;
- Android Chrome and iPhone Safari/mobile-web behaviour are treated as primary compatibility surfaces, with tablet/desktop responsive checks;
- an independent/read-only adversarial review record checks for missing deployed behaviour, invented pay assumptions, persistence loss, privacy regression and architecture coupling;
- build/test/parity evidence is green before any recovery PR can merge.

## Recovery stages

### R1 — Behaviour inventory

Create an explicit inventory from current deployment plus readable history. Minimum behaviours to account for:

- dashboard/navigation and mobile-first layout;
- profile/settings and assessment/planning period;
- shift templates and manual shift entry;
- overnight shifts;
- unpaid break handling;
- overtime / premium-rate calculation;
- pay calculation explanation;
- locally saved shifts;
- progress/target presentation;
- calendar/profile behaviours introduced by later deployment commits;
- backup/recovery behaviours if present in current deployment;
- any current compiled behaviour not represented above.

Output: `BEHAVIOUR_INVENTORY.md`, with provenance for each behaviour.

### R2 — Domain extraction

Recover calculation semantics into framework-independent modules first. No UI rewrite should be allowed to redefine pay semantics. Historical assumptions such as £17/hour or hard-coded premium multipliers are evidence of old behaviour, **not generic employer defaults**.

Output: source modules + golden fixtures/tests.

### R3 — Persistence contract

Define versioned local persistence, migration fixtures and backup/restore expectations before wiring recovered UI state. Preserve historical evidence rather than silently destructively rewriting user-entered shift truth.

### R4 — UI shell and parity

Rebuild mobile-first UI against recovered domain/persistence modules. Test phone widths first and validate iPhone Safari/Android Chrome compatibility risks. Tablet/desktop should be responsive, not separate architectures.

### R5 — Adversarial review and release gate

Reviewer must be read-only for the review pass. Every finding uses the factory finding format. Accepted findings return to executor for repair. Maximum three repair cycles before blocking that recovery task.

## Explicit non-goals

- Do not edit minified/hashed bundles as source.
- Do not claim byte-for-byte reconstruction of source that was never committed.
- Do not introduce authentication/server sync merely as part of recovery.
- Do not introduce new employer-specific pay assumptions.
- Do not use test:production LOC ratio as a target; it is context only.
- Do not merge recovery scaffolding simply because it builds. Behavioural/parity evidence is required.

## Current execution truth

This plan and branch were created in one observable connected execution context. Planner, recovery and reviewer roles are therefore logical roles at this stage; no independently executing sub-agent is claimed.
