# VIP Recovery Behaviour Inventory

Purpose: track what the recovered maintainable source must account for before the recovery branch can be considered behaviourally safe.

Legend: `READABLE` = directly evidenced in historical readable source; `DEPLOYMENT-HISTORY` = evidenced by later deployment commit metadata/assets but requires deeper parity verification; `APPROVED` = approved product direction that may intentionally supersede old behaviour; `UNKNOWN` = not yet evidenced sufficiently.

| Behaviour | Evidence | Status | Recovery requirement |
|---|---|---|---|
| Mobile viewport / responsive web UI | `4246357` viewport + <=520px responsive rules; `ef2e7c1` adds viewport-fit/safe-area styling | READABLE | Preserve phone-first layout; validate Android Chrome + iPhone Safari |
| Assessment/planning period | `4246357` start/end settings | READABLE | Recover as planning/pay-period concept, separate from optional target per approved direction |
| Earnings target/progress | `4246357` target + progress | READABLE + APPROVED CHANGE | Target must become optional; no forced childcare-target semantics |
| Shift templates | `4246357`: Early/Late/Long day/Night | READABLE | Recover as configurable convenience, not employer truth |
| Manual date/start/end entry | `4246357` | READABLE | Preserve |
| Overnight shift rollover | `4246357` bounds rolls end to next day | READABLE | Reimplement with explicit Europe/London DST tests |
| Unpaid break input | `4246357` 0/30/45/60 | READABLE + APPROVED CHANGE | Unknown break rule must be representable; do not invent employer default |
| Overtime multiplier input | `4246357` 1/1.25/1.5/2 | READABLE | Historical UI evidence only; generic recovery must not imply these are employer rules |
| Premium-rate segmentation | `4246357` hard-coded Sunday/Saturday/weekday-night multipliers | READABLE / LEGACY ASSUMPTION | Preserve only as historical Loren configuration evidence if still validated; never promote to generic default |
| Break deduction from lowest-paid segment | `4246357` calculation logic | READABLE / LEGACY ASSUMPTION | Requires explicit product/pay-rule evidence before generic reuse |
| Calculation explanation | `4246357` segment details | READABLE | Preserve show-workings principle |
| Local shift persistence | `4246357` localStorage `vip-shifts-v1` | READABLE | Replace/recover behind versioned persistence contract with migration/recovery tests |
| Local settings persistence | `4246357` localStorage `vip-settings-v1` | READABLE | Version/migrate safely |
| Dashboard-style navigation | `ef2e7c1` V2 source diff | READABLE | Account for in recovered shell |
| Apple/mobile web capability / safe area | `ef2e7c1` metadata/CSS | READABLE | Preserve cross-platform PWA-friendly behaviour without native split |
| Calendar profile functionality | commits `6f2e03b`, `d657229`, `afcd1a3` deployment messages | DEPLOYMENT-HISTORY | Inspect deployed assets/history and document exact behaviour before parity claim |
| Scheduled → Worked truth/history | approved product contract | APPROVED | Recovered model must retain scheduled history and latest confirmed worked truth separately |
| Worked corrections | approved product contract | APPROVED | Later correction supersedes worked truth without deleting history |
| Planned → Worked → Paid | approved product contract | APPROVED | Persistence/domain architecture must leave room for payroll/payslip final truth |
| Backup/restore | prior conversational claims are not durable evidence | UNKNOWN | Inspect current deployment; implement only with explicit contract/evidence |
| Authentication/server sync | deliberately deferred direction | APPROVED NON-GOAL | Do not introduce during recovery |

## Open inventory work

1. Inspect the current compiled deployment for later dashboard/profile/calendar behaviour without treating minified code as maintainable source.
2. Determine whether backup/export/import exists in durable deployed behaviour.
3. Separate Loren-specific validated configuration from generic employer defaults.
4. Build golden fixtures from historical readable calculations before refactoring semantics.
5. Record any intentionally superseded old behaviour rather than silently dropping it.

## Adversarial note

The largest recovery risk is **semantic laundering**: an assumption found in the 2026 Loren prototype can easily become a seemingly authoritative generic pay rule merely because it is present in old code. Every recovered pay/break/premium assumption therefore needs provenance and must remain configuration/unknown unless a genuine applicable rule is deterministically established.
