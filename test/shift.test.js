import test from 'node:test';
import assert from 'node:assert/strict';
import { createScheduledShift, confirmWorked, latestWorked, effectiveShift } from '../src/domain/shift.js';

const scheduled = () => createScheduledShift({
  id: 'shift-1', start: '2026-09-01T07:00:00+01:00', end: '2026-09-01T15:00:00+01:00', unpaidBreakMinutes: 60,
});

test('scheduled truth remains effective before Worked confirmation', () => {
  const shift = scheduled();
  assert.deepEqual(effectiveShift(shift), shift.scheduled);
  assert.equal(latestWorked(shift), null);
});

test('Worked confirmation becomes effective without overwriting schedule', () => {
  const shift = scheduled();
  const worked = confirmWorked(shift, {
    start: '2026-09-01T07:05:00+01:00', end: '2026-09-01T14:00:00+01:00', unpaidBreakMinutes: 60, confirmedAt: '2026-09-01T14:05:00+01:00',
  });
  assert.deepEqual(worked.scheduled, shift.scheduled);
  assert.equal(worked.workedHistory.length, 1);
  assert.equal(effectiveShift(worked).end, '2026-09-01T14:00:00+01:00');
  assert.equal(shift.workedHistory.length, 0, 'input shift remains immutable');
});

test('later Worked correction supersedes current truth and retains prior confirmation', () => {
  const first = confirmWorked(scheduled(), {
    start: '2026-09-01T07:05:00+01:00', end: '2026-09-01T14:00:00+01:00', unpaidBreakMinutes: 60, confirmedAt: '2026-09-01T14:05:00+01:00',
  });
  const corrected = confirmWorked(first, {
    start: '2026-09-01T07:05:00+01:00', end: '2026-09-01T14:30:00+01:00', unpaidBreakMinutes: 45, confirmedAt: '2026-09-01T18:00:00+01:00',
  });
  assert.equal(corrected.workedHistory.length, 2);
  assert.equal(corrected.workedHistory[0].end, '2026-09-01T14:00:00+01:00');
  assert.equal(latestWorked(corrected).end, '2026-09-01T14:30:00+01:00');
  assert.equal(corrected.scheduled.end, '2026-09-01T15:00:00+01:00');
});
