export const ContractStatus = {
  CREATED: 'Created',
  APPROVED: 'Approved',
  SENT: 'Sent',
  SIGNED: 'Signed',
  LOCKED: 'Locked',
  REVOKED: 'Revoked',
} as const;

export type ContractStatus = typeof ContractStatus[keyof typeof ContractStatus];