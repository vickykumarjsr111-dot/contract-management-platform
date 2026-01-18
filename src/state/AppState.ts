import type { Blueprint } from '../models/Blueprint';
import type { Contract } from '../models/Contract';

export interface AppState {
  blueprints: Blueprint[];
  contracts: Contract[];
}

export const initialState: AppState = {
  blueprints: [],
  contracts: [],
};
