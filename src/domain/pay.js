export function forecastShiftPay({ start, end, unpaidBreakMinutes = 0, baseRatePence, premiumSegments = [] }) {
  if (!Number.isInteger(baseRatePence) || baseRatePence < 0) throw new Error('baseRatePence must be non-negative integer pence');
  if (!Number.isInteger(unpaidBreakMinutes) || unpaidBreakMinutes < 0) throw new Error('unpaidBreakMinutes must be a non-negative integer');
  const startMs = new Date(start).getTime();
  const endMs = new Date(end).getTime();
  if (!Number.isFinite(startMs) || !Number.isFinite(endMs)) throw new Error('start/end must be valid ISO datetimes');
  if (endMs <= startMs) throw new Error('end must be after start; overnight shifts require explicit dated datetimes');
  const workedMinutes = Math.round((endMs - startMs) / 60000) - unpaidBreakMinutes;
  if (workedMinutes < 0) throw new Error('break cannot exceed shift duration');

  // Generic forecast deliberately applies no employer premium unless explicit segments are supplied.
  let grossPence = Math.round((workedMinutes * baseRatePence) / 60);
  const explanation = [{ kind: 'base', minutes: workedMinutes, ratePence: baseRatePence, amountPence: grossPence }];
  let premiumMinutes = 0;

  for (const segment of premiumSegments) {
    if (!Number.isInteger(segment.minutes) || segment.minutes < 0) throw new Error('premium minutes must be a non-negative integer');
    if (!Number.isInteger(segment.multiplierBps) || segment.multiplierBps < 10000) throw new Error('premium multiplierBps must be >= 10000');
    premiumMinutes += segment.minutes;
    if (premiumMinutes > workedMinutes) throw new Error('premium segments cannot exceed worked minutes');
    const extraPence = Math.round((segment.minutes * baseRatePence * (segment.multiplierBps - 10000)) / 600000);
    grossPence += extraPence;
    explanation.push({ kind: 'premium', minutes: segment.minutes, multiplierBps: segment.multiplierBps, amountPence: extraPence });
  }

  return { workedMinutes, grossPence, explanation };
}
