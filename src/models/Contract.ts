import { ContractStatus } from './ContractStatus';

export interface Contract {
  id: string;
  name: string;
  blueprintId: string;
  status: ContractStatus;
  values: Record<string, any>;
  createdAt: string;
}
