function money(pence) {
  if (!Number.isInteger(pence)) return 'Needs pay rule';
  return `£${(pence / 100).toFixed(2)}`;
}

function forecastText(forecast) {
  if (!forecast || forecast.status !== 'ready') return 'Forecast needs pay-rule information';
  return `Forecast ${money(forecast.totalPence)}`;
}

export function renderShiftCard(workflow, id) {
  const result = workflow.getShift(id);
  if (!result) return '<p>Shift not found</p>';
  const { shift, forecast } = result;
  const worked = shift.workedHistory?.at(-1);
  const reconciliation = workflow.getReconciliation(id);
  const paid = shift.paidHistory?.at(-1);

  return `<article data-shift-id="${id}">
    <h2>${worked ? 'Worked' : 'Scheduled'} shift</h2>
    <p>${forecastText(forecast)}</p>
    ${worked ? `<p>Actual: ${worked.start} – ${worked.end}</p>` : ''}
    ${paid ? `<p>Paid: ${money(paid.totalPence)}</p>` : ''}
    ${reconciliation?.status === 'reconciled' ? `<p>Difference: ${money(reconciliation.variancePence)}</p>` : ''}
  </article>`;
}

export function createMobileView({ workflow, root }) {
  function refresh() {
    const { shifts } = workflow.state();
    root.innerHTML = `<main><h1>VIP</h1>${shifts.map((shift) => renderShiftCard(workflow, shift.id)).join('')}</main>`;
  }

  function addScheduled(input) {
    const result = workflow.addScheduled(input);
    refresh();
    return result;
  }

  function confirmActual(id, worked) {
    const result = workflow.confirmActual(id, worked);
    refresh();
    return result;
  }

  function recordActualPaid(id, paid) {
    const result = workflow.recordActualPaid(id, paid);
    refresh();
    return result;
  }

  refresh();
  return { addScheduled, confirmActual, recordActualPaid, refresh };
}
