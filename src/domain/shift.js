function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function requireIso(value, field) {
  if (!value || !Number.isFinite(new Date(value).getTime())) throw new Error(`${field} must be a valid ISO datetime`);
}

export function createScheduledShift({ id, start, end, unpaidBreakMinutes = null }) {
  if (!id) throw new Error('id is required');
  requireIso(start, 'start');
  requireIso(end, 'end');
  if (new Date(end) <= new Date(start)) throw new Error('scheduled end must be after start');
  if (unpaidBreakMinutes !== null && (!Number.isInteger(unpaidBreakMinutes) || unpaidBreakMinutes < 0)) throw new Error('unpaidBreakMinutes must be null or non-negative integer');
  return {
    id,
    scheduled: { start, end, unpaidBreakMinutes },
    workedHistory: [],
  };
}

export function confirmWorked(shift, { start, end, unpaidBreakMinutes, confirmedAt }) {
  requireIso(start, 'worked start');
  requireIso(end, 'worked end');
  requireIso(confirmedAt, 'confirmedAt');
  if (new Date(end) <= new Date(start)) throw new Error('worked end must be after start');
  if (!Number.isInteger(unpaidBreakMinutes) || unpaidBreakMinutes < 0) throw new Error('worked unpaidBreakMinutes must be non-negative integer');

  const next = clone(shift);
  next.workedHistory.push({ start, end, unpaidBreakMinutes, confirmedAt });
  return next;
}

export function latestWorked(shift) {
  return shift.workedHistory.length ? clone(shift.workedHistory[shift.workedHistory.length - 1]) : null;
}

export function effectiveShift(shift) {
  return latestWorked(shift) ?? clone(shift.scheduled);
}
