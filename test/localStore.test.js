import test from 'node:test';
import assert from 'node:assert/strict';
import { createScheduledShift, confirmWorked } from '../src/domain/shift.js';
import { STORAGE_VERSION, serializeState, deserializeState, saveState, loadState } from '../src/persistence/localStore.js';

function memoryStorage() {
  const values = new Map();
  return {
    getItem: key => values.has(key) ? values.get(key) : null,
    setItem: (key, value) => values.set(key, value),
  };
}

function workedShift() {
  const scheduled = createScheduledShift({
    id: 'shift-1', start: '2026-09-01T07:00:00+01:00', end: '2026-09-01T15:00:00+01:00', unpaidBreakMinutes: 60,
  });
  return confirmWorked(scheduled, {
    start: '2026-09-01T07:05:00+01:00', end: '2026-09-01T14:30:00+01:00', unpaidBreakMinutes: 45, confirmedAt: '2026-09-01T18:00:00+01:00',
  });
}

test('empty storage loads a versioned empty state', () => {
  assert.deepEqual(loadState(memoryStorage()), { version: STORAGE_VERSION, shifts: [] });
});

test('scheduled and Worked history survives save and reload', () => {
  const storage = memoryStorage();
  const state = { shifts: [workedShift()] };
  saveState(storage, state);
  const loaded = loadState(storage);
  assert.equal(loaded.shifts.length, 1);
  assert.equal(loaded.shifts[0].scheduled.end, '2026-09-01T15:00:00+01:00');
  assert.equal(loaded.shifts[0].workedHistory.length, 1);
  assert.equal(loaded.shifts[0].workedHistory[0].end, '2026-09-01T14:30:00+01:00');
});

test('serialization does not retain mutable references', () => {
  const shift = workedShift();
  const raw = serializeState({ shifts: [shift] });
  shift.scheduled.end = '2099-01-01T00:00:00Z';
  assert.equal(deserializeState(raw).shifts[0].scheduled.end, '2026-09-01T15:00:00+01:00');
});

test('corrupt JSON fails visibly instead of silently losing data', () => {
  assert.throws(() => deserializeState('{bad'), /not valid JSON/);
});

test('unknown future schema fails visibly instead of destructive downgrade', () => {
  assert.throws(() => deserializeState(JSON.stringify({ version: 99, shifts: [] })), /unsupported VIP data version/);
});

test('invalid stored shift collection fails visibly', () => {
  assert.throws(() => deserializeState(JSON.stringify({ version: STORAGE_VERSION, shifts: {} })), /must be an array/);
});
