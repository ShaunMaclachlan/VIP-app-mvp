import { forecastEffectiveShift } from './forecast.js';

export function recordPaid(shift, paid) {
  if (!Number.isInteger(paid.totalPence) || paid.totalPence < 0) throw new Error('paid total must be non-negative integer pence');
  if (!paid.recordedAt || !Number.isFinite(new Date(paid.recordedAt).getTime())) throw new Error('recordedAt must be valid ISO datetime');
  return { ...shift, paidHistory: [...(shift.paidHistory ?? []), { ...paid }] };
}

export function latestPaid(shift) {
  const history = shift.paidHistory ?? [];
  return history.length ? { ...history[history.length - 1] } : null;
}

export function reconcileShift(shift, payConfig) {
  const forecast = forecastEffectiveShift(shift, payConfig);
  const paid = latestPaid(shift);
  return {
    planned: shift.scheduled,
    worked: shift.workedHistory?.length ? shift.workedHistory[shift.workedHistory.length - 1] : null,
    forecast,
    paid,
    variancePence: paid && forecast.status === 'forecast' ? paid.totalPence - forecast.totalPence : null,
  };
}
