import type { AppState } from './AppState';
import type { Blueprint } from '../models/Blueprint';
import type { Contract } from '../models/Contract';
import { saveState } from './storage';

export type AppAction =
  | { type: 'ADD_BLUEPRINT'; payload: Blueprint }
  | { type: 'ADD_CONTRACT'; payload: Contract };

export function appReducer(
  state: AppState,
  action: AppAction
): AppState {
  switch (action.type) {
    case 'ADD_BLUEPRINT': {
      const newState: AppState = {
        ...state,
        blueprints: [...state.blueprints, action.payload],
      };

      saveState(newState);
      return newState;
    }

    case 'ADD_CONTRACT': {
      const newState: AppState = {
        ...state,
        contracts: [...state.contracts, action.payload],
      };

      saveState(newState);
      return newState;
    }

    default:
      return state;
  }
}
