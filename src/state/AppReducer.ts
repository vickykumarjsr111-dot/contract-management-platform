import type { AppState } from './AppState';
import { ContractStatus } from '../models/ContractStatus';

export type Action =
  | { type: 'ADD_BLUEPRINT'; payload: any }
  | { type: 'ADD_CONTRACT'; payload: any }
  | { type: 'UPDATE_CONTRACT_STATUS'; payload: { id: string; status: string } }
  | { type: 'UPDATE_CONTRACT_VALUES'; payload: { id: string; values: Record<string, any> } }
  | { type: 'REMOVE_CONTRACT'; payload: { id: string } }
  | { type: 'LOCK_BLUEPRINT'; payload: { id: string } }
  | { type: 'REMOVE_BLUEPRINT'; payload: { id: string } };

export function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'ADD_BLUEPRINT':
      return {
        ...state,
        blueprints: [...state.blueprints, action.payload],
      };

    case 'ADD_CONTRACT':
      return {
        ...state,
        contracts: [...state.contracts, action.payload],
      };

    case 'UPDATE_CONTRACT_STATUS':
      return {
        ...state,
        contracts: state.contracts.map(c =>
          c.id === action.payload.id
            ? { ...c, status: action.payload.status as ContractStatus }
            : c
        ),
      };

    case 'UPDATE_CONTRACT_VALUES':
      return {
        ...state,
        contracts: state.contracts.map(c =>
          c.id === action.payload.id
            ? { ...c, values: action.payload.values }
            : c
        ),
      };

    case 'REMOVE_CONTRACT':
      return {
        ...state,
        contracts: state.contracts.filter(c => c.id !== action.payload.id),
      };

    case 'LOCK_BLUEPRINT':
      return {
        ...state,
        blueprints: state.blueprints.map(bp =>
          bp.id === action.payload.id
            ? { ...bp, locked: true }
            : bp
        ),
      };

    case 'REMOVE_BLUEPRINT':
      return {
        ...state,
        blueprints: state.blueprints.filter(bp => bp.id !== action.payload.id),
      };

    default:
      return state;
  }
}
