import type { AppState } from './AppState';

const STORAGE_KEY = 'contract-management-state';

export function saveState(state: AppState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function loadState(): AppState | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AppState;
  } catch {
    return null;
  }
}
