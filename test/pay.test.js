import test from 'node:test';
import assert from 'node:assert/strict';
import { forecastShiftPay } from '../src/domain/pay.js';

test('forecasts a scheduled shift in integer pence', () => {
  const result = forecastShiftPay({ start: '2026-09-01T07:00:00+01:00', end: '2026-09-01T15:00:00+01:00', unpaidBreakMinutes: 60, baseRatePence: 1790 });
  assert.equal(result.workedMinutes, 420);
  assert.equal(result.grossPence, 12530);
});

test('does not invent employer premiums', () => {
  const result = forecastShiftPay({ start: '2026-09-06T07:00:00+01:00', end: '2026-09-06T15:00:00+01:00', unpaidBreakMinutes: 60, baseRatePence: 1790 });
  assert.equal(result.grossPence, 12530);
  assert.equal(result.explanation.length, 1);
});

test('applies only explicitly supplied premium segments', () => {
  const result = forecastShiftPay({ start: '2026-09-06T07:00:00+01:00', end: '2026-09-06T15:00:00+01:00', unpaidBreakMinutes: 60, baseRatePence: 1790, premiumSegments: [{ minutes: 420, multiplierBps: 16000 }] });
  assert.equal(result.grossPence, 20048);
});

test('rejects premium coverage beyond worked minutes', () => {
  assert.throws(() => forecastShiftPay({
    start: '2026-09-06T07:00:00+01:00', end: '2026-09-06T15:00:00+01:00', unpaidBreakMinutes: 60, baseRatePence: 1790,
    premiumSegments: [{ minutes: 300, multiplierBps: 13000 }, { minutes: 121, multiplierBps: 16000 }],
  }), /premium segments cannot exceed worked minutes/);
});

test('handles explicit overnight dated datetimes', () => {
  const result = forecastShiftPay({ start: '2026-09-01T22:00:00+01:00', end: '2026-09-02T06:00:00+01:00', unpaidBreakMinutes: 30, baseRatePence: 1200 });
  assert.equal(result.workedMinutes, 450);
  assert.equal(result.grossPence, 9000);
});

test('spring-forward elapsed time is calculated from timezone-aware instants', () => {
  const result = forecastShiftPay({ start: '2026-03-29T00:00:00+00:00', end: '2026-03-29T08:00:00+01:00', baseRatePence: 1200 });
  assert.equal(result.workedMinutes, 420);
  assert.equal(result.grossPence, 8400);
});

test('rejects impossible break duration', () => {
  assert.throws(() => forecastShiftPay({ start: '2026-09-01T07:00:00+01:00', end: '2026-09-01T08:00:00+01:00', unpaidBreakMinutes: 90, baseRatePence: 1790 }), /break cannot exceed/);
});
