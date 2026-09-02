import test from 'node:test';
import assert from 'node:assert/strict';
import { createScheduledShift, confirmWorked } from '../src/domain/shift.js';
import { recordPaid, reconcileShift } from '../src/domain/reconciliation.js';

const scheduled = { id: 's1', start: '2026-09-01T07:00:00+01:00', end: '2026-09-01T15:00:00+01:00', unpaidBreakMinutes: 60 };

test('reconciliation preserves Planned Worked and Paid truth', () => {
  let shift = createScheduledShift(scheduled);
  shift = confirmWorked(shift, { start: scheduled.start, end: '2026-09-01T14:00:00+01:00', unpaidBreakMinutes: 60, confirmedAt: '2026-09-01T14:05:00+01:00' });
  shift = recordPaid(shift, { totalPence: 10500, recordedAt: '2026-09-30T09:00:00+01:00', reference: 'payroll' });
  const result = reconcileShift(shift, { baseRatePence: 1790 });
  assert.deepEqual(result.planned, shift.scheduled);
  assert.deepEqual(result.worked, shift.workedHistory[0]);
  assert.equal(result.forecast.totalPence, 10740);
  assert.equal(result.paid.totalPence, 10500);
  assert.equal(result.variancePence, -240);
});

test('later paid correction supersedes paid truth without deleting history', () => {
  let shift = createScheduledShift(scheduled);
  shift = recordPaid(shift, { totalPence: 12000, recordedAt: '2026-09-30T09:00:00+01:00' });
  shift = recordPaid(shift, { totalPence: 12530, recordedAt: '2026-10-01T09:00:00+01:00' });
  const result = reconcileShift(shift, { baseRatePence: 1790 });
  assert.equal(shift.paidHistory.length, 2);
  assert.equal(result.paid.totalPence, 12530);
  assert.equal(result.variancePence, 0);
});

test('unknown pay rule keeps variance unresolved', () => {
  let shift = createScheduledShift({ ...scheduled, unpaidBreakMinutes: null });
  shift = recordPaid(shift, { totalPence: 12530, recordedAt: '2026-09-30T09:00:00+01:00' });
  const result = reconcileShift(shift, { baseRatePence: 1790 });
  assert.equal(result.forecast.status, 'needs-pay-rule');
  assert.equal(result.variancePence, null);
});
