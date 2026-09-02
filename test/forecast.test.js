import test from 'node:test';
import assert from 'node:assert/strict';
import { createScheduledShift, confirmWorked } from '../src/domain/shift.js';
import { forecastEffectiveShift } from '../src/domain/forecast.js';

const config = { baseRatePence: 1790 };

function scheduledShift(unpaidBreakMinutes = 60) {
  return createScheduledShift({
    id: 'shift-1',
    start: '2026-09-01T07:00:00+01:00',
    end: '2026-09-01T15:00:00+01:00',
    unpaidBreakMinutes,
  });
}

test('scheduled truth drives forecast before Worked confirmation', () => {
  const result = forecastEffectiveShift(scheduledShift(), config);
  assert.equal(result.status, 'forecast');
  assert.equal(result.source, 'scheduled');
  assert.equal(result.workedMinutes, 420);
  assert.equal(result.grossPence, 12530);
});

test('latest Worked truth changes forecast while scheduled truth is retained', () => {
  const scheduled = scheduledShift();
  const worked = confirmWorked(scheduled, {
    start: '2026-09-01T07:00:00+01:00',
    end: '2026-09-01T14:00:00+01:00',
    unpaidBreakMinutes: 60,
    confirmedAt: '2026-09-01T14:05:00+01:00',
  });
  const result = forecastEffectiveShift(worked, config);
  assert.equal(result.source, 'worked');
  assert.equal(result.workedMinutes, 360);
  assert.equal(result.grossPence, 10740);
  assert.equal(worked.scheduled.end, '2026-09-01T15:00:00+01:00');
});

test('later Worked correction supersedes forecast without deleting earlier confirmation', () => {
  const first = confirmWorked(scheduledShift(), {
    start: '2026-09-01T07:00:00+01:00', end: '2026-09-01T14:00:00+01:00', unpaidBreakMinutes: 60, confirmedAt: '2026-09-01T14:05:00+01:00',
  });
  const corrected = confirmWorked(first, {
    start: '2026-09-01T07:00:00+01:00', end: '2026-09-01T14:30:00+01:00', unpaidBreakMinutes: 45, confirmedAt: '2026-09-01T18:00:00+01:00',
  });
  const result = forecastEffectiveShift(corrected, config);
  assert.equal(result.workedMinutes, 405);
  assert.equal(result.grossPence, 12083);
  assert.equal(corrected.workedHistory.length, 2);
});

test('unknown break rule blocks confident pay instead of inventing an employer default', () => {
  const result = forecastEffectiveShift(scheduledShift(null), config);
  assert.deepEqual(result, { status: 'needs-pay-rule', reason: 'unpaid-break-unknown', source: 'scheduled' });
});
