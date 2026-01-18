import React, { createContext, useReducer } from 'react';
import { appReducer, type AppAction } from './AppReducer';
import type { AppState } from './AppState';
import { loadState } from './storage';

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

// 🔹 Load state from localStorage or fallback
const initialState: AppState =
  loadState() ?? {
    blueprints: [],
    contracts: [],
  };

export const AppContext = createContext<AppContextValue>({
  state: initialState,
  dispatch: () => {},
});

export function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
