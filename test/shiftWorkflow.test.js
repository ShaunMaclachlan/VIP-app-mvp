import test from 'node:test';
import assert from 'node:assert/strict';
import { createShiftWorkflow } from '../src/app/shiftWorkflow.js';

function memoryStorage() {
  const data = new Map();
  return {
    getItem: (key) => data.has(key) ? data.get(key) : null,
    setItem: (key, value) => data.set(key, value),
  };
}

const scheduled = {
  id: 'shift-1',
  start: '2026-09-01T07:00:00+01:00',
  end: '2026-09-01T15:00:00+01:00',
  unpaidBreakMinutes: 60,
};

test('scheduled -> forecast -> Worked -> changed forecast -> reload preserves history', () => {
  const storage = memoryStorage();
  const payConfig = { baseRatePence: 1790 };
  const workflow = createShiftWorkflow({ storage, payConfig });

  const planned = workflow.addScheduled(scheduled);
  assert.equal(planned.forecast.source, 'scheduled');
  assert.equal(planned.forecast.totalPence, 12530);

  const worked = workflow.confirmActual('shift-1', {
    start: '2026-09-01T07:00:00+01:00',
    end: '2026-09-01T14:00:00+01:00',
    unpaidBreakMinutes: 60,
    confirmedAt: '2026-09-01T14:05:00+01:00',
  });
  assert.equal(worked.forecast.source, 'worked');
  assert.equal(worked.forecast.totalPence, 10740);
  assert.deepEqual(worked.shift.scheduled, {
    start: scheduled.start,
    end: scheduled.end,
    unpaidBreakMinutes: 60,
  });

  const reloaded = createShiftWorkflow({ storage, payConfig }).getShift('shift-1');
  assert.equal(reloaded.forecast.totalPence, 10740);
  assert.equal(reloaded.shift.workedHistory.length, 1);
});

test('later Worked correction supersedes current pay but retains earlier confirmation', () => {
  const storage = memoryStorage();
  const workflow = createShiftWorkflow({ storage, payConfig: { baseRatePence: 1790 } });
  workflow.addScheduled(scheduled);
  workflow.confirmActual('shift-1', {
    start: scheduled.start,
    end: '2026-09-01T14:00:00+01:00',
    unpaidBreakMinutes: 60,
    confirmedAt: '2026-09-01T14:05:00+01:00',
  });
  const corrected = workflow.confirmActual('shift-1', {
    start: scheduled.start,
    end: scheduled.end,
    unpaidBreakMinutes: 30,
    confirmedAt: '2026-09-01T16:00:00+01:00',
  });
  assert.equal(corrected.shift.workedHistory.length, 2);
  assert.equal(corrected.forecast.totalPence, 13425);
});

test('unknown scheduled break remains explicit rather than inventing employer rule', () => {
  const storage = memoryStorage();
  const workflow = createShiftWorkflow({ storage, payConfig: { baseRatePence: 1790 } });
  const result = workflow.addScheduled({ ...scheduled, unpaidBreakMinutes: null });
  assert.equal(result.forecast.status, 'needs-pay-rule');
  assert.equal(result.forecast.reason, 'unpaid-break-unknown');
});

test('Planned -> Worked -> Paid persists and reloads with variance explanation', () => {
  const storage = memoryStorage();
  const payConfig = { baseRatePence: 1790 };
  const workflow = createShiftWorkflow({ storage, payConfig });
  workflow.addScheduled(scheduled);
  workflow.confirmActual('shift-1', {
    start: scheduled.start,
    end: '2026-09-01T14:00:00+01:00',
    unpaidBreakMinutes: 60,
    confirmedAt: '2026-09-01T14:05:00+01:00',
  });

  const paid = workflow.recordActualPaid('shift-1', {
    totalPence: 10500,
    recordedAt: '2026-09-30T09:00:00+01:00',
    reference: 'payroll',
  });
  assert.equal(paid.reconciliation.forecast.totalPence, 10740);
  assert.equal(paid.reconciliation.paid.totalPence, 10500);
  assert.equal(paid.reconciliation.variancePence, -240);

  const reloaded = createShiftWorkflow({ storage, payConfig }).getReconciliation('shift-1');
  assert.equal(reloaded.planned.end, scheduled.end);
  assert.equal(reloaded.worked.end, '2026-09-01T14:00:00+01:00');
  assert.equal(reloaded.paid.reference, 'payroll');
  assert.equal(reloaded.variancePence, -240);
});
