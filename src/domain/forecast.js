import { effectiveShift } from './shift.js';
import { forecastShiftPay } from './pay.js';

export function forecastEffectiveShift(shift, payConfig) {
  if (!shift) throw new Error('shift is required');
  const effective = effectiveShift(shift);
  if (effective.unpaidBreakMinutes === null || effective.unpaidBreakMinutes === undefined) {
    return {
      status: 'needs-pay-rule',
      reason: 'unpaid-break-unknown',
      source: shift.workedHistory.length ? 'worked' : 'scheduled',
    };
  }

  const pay = forecastShiftPay({
    ...effective,
    baseRatePence: payConfig.baseRatePence,
    premiumSegments: payConfig.premiumSegments ?? [],
  });

  return {
    status: 'forecast',
    source: shift.workedHistory.length ? 'worked' : 'scheduled',
    totalPence: pay.grossPence,
    ...pay,
  };
}
