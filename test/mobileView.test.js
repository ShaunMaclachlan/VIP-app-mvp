import test from 'node:test';
import assert from 'node:assert/strict';
import { createShiftWorkflow } from '../src/app/shiftWorkflow.js';
import { createMobileView } from '../src/app/mobileView.js';

function memoryStorage() {
  const data = new Map();
  return {
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => data.set(key, value),
    removeItem: (key) => data.delete(key),
  };
}

const payConfig = { baseRatePence: 1790, premiumSegments: [] };

const scheduled = {
  id: 'shift-1',
  start: '2026-09-02T07:00:00+01:00',
  end: '2026-09-02T15:00:00+01:00',
  unpaidBreakMinutes: 0,
};

test('mobile journey renders scheduled, Worked and Paid truth after each action', () => {
  const storage = memoryStorage();
  const root = { innerHTML: '' };
  const workflow = createShiftWorkflow({ storage, payConfig });
  const view = createMobileView({ workflow, root });

  view.addScheduled(scheduled);
  assert.match(root.innerHTML, /Scheduled shift/);
  assert.match(root.innerHTML, /Forecast £143\.20/);

  view.confirmActual('shift-1', {
    start: '2026-09-02T07:00:00+01:00',
    end: '2026-09-02T14:00:00+01:00',
    unpaidBreakMinutes: 0,
    confirmedAt: '2026-09-02T14:01:00+01:00',
  });
  assert.match(root.innerHTML, /Worked shift/);
  assert.match(root.innerHTML, /Forecast £125\.30/);

  view.recordActualPaid('shift-1', {
    totalPence: 12000,
    recordedAt: '2026-09-30T09:00:00+01:00',
  });
  assert.match(root.innerHTML, /Paid: £120\.00/);
  assert.match(root.innerHTML, /Difference: -£5\.30/);
});

test('reload renders persisted Worked state without recreating the shift', () => {
  const storage = memoryStorage();
  const firstRoot = { innerHTML: '' };
  const first = createMobileView({ workflow: createShiftWorkflow({ storage, payConfig }), root: firstRoot });
  first.addScheduled(scheduled);
  first.confirmActual('shift-1', {
    start: '2026-09-02T07:00:00+01:00',
    end: '2026-09-02T14:00:00+01:00',
    unpaidBreakMinutes: 0,
    confirmedAt: '2026-09-02T14:01:00+01:00',
  });

  const reloadedRoot = { innerHTML: '' };
  createMobileView({ workflow: createShiftWorkflow({ storage, payConfig }), root: reloadedRoot });
  assert.match(reloadedRoot.innerHTML, /Worked shift/);
  assert.match(reloadedRoot.innerHTML, /Forecast £125\.30/);
});
