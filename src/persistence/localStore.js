export const STORAGE_VERSION = 1;

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export function serializeState(state) {
  if (!state || !Array.isArray(state.shifts)) throw new Error('state.shifts must be an array');
  return JSON.stringify({ version: STORAGE_VERSION, shifts: clone(state.shifts) });
}

export function deserializeState(raw) {
  if (raw === null || raw === undefined || raw === '') return { version: STORAGE_VERSION, shifts: [] };
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error('saved VIP data is not valid JSON');
  }
  if (parsed.version !== STORAGE_VERSION) throw new Error(`unsupported VIP data version: ${parsed.version}`);
  if (!Array.isArray(parsed.shifts)) throw new Error('saved VIP shifts must be an array');
  return { version: STORAGE_VERSION, shifts: clone(parsed.shifts) };
}

export function saveState(storage, state, key = 'vip-state') {
  if (!storage?.setItem) throw new Error('storage adapter must provide setItem');
  storage.setItem(key, serializeState(state));
}

export function loadState(storage, key = 'vip-state') {
  if (!storage?.getItem) throw new Error('storage adapter must provide getItem');
  return deserializeState(storage.getItem(key));
}
