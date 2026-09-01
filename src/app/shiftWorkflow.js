import { createScheduledShift, confirmWorked } from '../domain/shift.js';
import { forecastEffectiveShift } from '../domain/forecast.js';
import { loadState, saveState } from '../persistence/localStore.js';

function replaceShift(shifts, nextShift) {
  const index = shifts.findIndex((shift) => shift.id === nextShift.id);
  if (index < 0) return [...shifts, nextShift];
  return shifts.map((shift, i) => (i === index ? nextShift : shift));
}

export function createShiftWorkflow({ storage, payConfig }) {
  function state() {
    return loadState(storage);
  }

  function addScheduled(input) {
    const current = state();
    if (current.shifts.some((shift) => shift.id === input.id)) throw new Error('shift id already exists');
    const shift = createScheduledShift(input);
    saveState(storage, { ...current, shifts: [...current.shifts, shift] });
    return { shift, forecast: forecastEffectiveShift(shift, payConfig) };
  }

  function confirmActual(id, worked) {
    const current = state();
    const existing = current.shifts.find((shift) => shift.id === id);
    if (!existing) throw new Error('shift not found');
    const shift = confirmWorked(existing, worked);
    saveState(storage, { ...current, shifts: replaceShift(current.shifts, shift) });
    return { shift, forecast: forecastEffectiveShift(shift, payConfig) };
  }

  function getShift(id) {
    const shift = state().shifts.find((item) => item.id === id);
    return shift ? { shift, forecast: forecastEffectiveShift(shift, payConfig) } : null;
  }

  return { addScheduled, confirmActual, getShift, state };
}
