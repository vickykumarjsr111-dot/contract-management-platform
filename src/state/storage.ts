import type { AppState } from './AppState';

const STORAGE_KEY = 'contract_manager_state';

export function saveState(state: AppState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function loadState(): AppState | undefined {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return undefined;

  try {
    return JSON.parse(raw) as AppState;
  } catch {
    return undefined;
  }
}
