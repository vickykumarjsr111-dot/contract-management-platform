import { ContractStatus } from '../models/ContractStatus';

const allowedTransitions: Record<ContractStatus, ContractStatus[]> = {
  Created: ['Approved', 'Revoked'],
  Approved: ['Sent'],
  Sent: ['Signed', 'Revoked'],
  Signed: ['Locked'],
  Locked: [],
  Revoked: [],
};

export function canTransition(
  from: ContractStatus,
  to: ContractStatus
): boolean {
  return allowedTransitions[from].includes(to);
}
