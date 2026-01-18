import { createContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import { appReducer } from './AppReducer';
import type { AppState } from './AppState';
import { initialState } from './AppState';
import { loadState, saveState } from './storage';

export const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

export function AppContextProvider({ children }: { children: ReactNode }) {
  const persistedState = loadState();

  const [state, dispatch] = useReducer(
    appReducer,
    persistedState || initialState
  );

  useEffect(() => {
    saveState(state);
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
