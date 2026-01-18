import { useContext } from 'react';
import { AppContext } from '../state/AppContext';
import { ContractStatus } from '../models/ContractStatus';
import type { Contract } from '../models/Contract';
import './ContractList.css';

export default function ContractList() {
  const { state, dispatch } = useContext(AppContext);

  function updateStatus(contract: Contract, status: ContractStatus) {
    dispatch({
      type: 'UPDATE_CONTRACT',
      payload: { ...contract, status },
    });
  }

  function renderActions(contract: Contract) {
    const isFinal =
      contract.status === ContractStatus.LOCKED ||
      contract.status === ContractStatus.REVOKED;

    if (isFinal) return null;

    return (
      <div className="contract-actions">
        {contract.status === ContractStatus.CREATED && (
          <button onClick={() => updateStatus(contract, ContractStatus.APPROVED)}>
            Approve
          </button>
        )}

        {contract.status === ContractStatus.APPROVED && (
          <button onClick={() => updateStatus(contract, ContractStatus.SENT)}>
            Send
          </button>
        )}

        {contract.status === ContractStatus.SENT && (
          <button onClick={() => updateStatus(contract, ContractStatus.SIGNED)}>
            Sign
          </button>
        )}

        {contract.status === ContractStatus.SIGNED && (
          <button onClick={() => updateStatus(contract, ContractStatus.LOCKED)}>
            Lock
          </button>
        )}

        <button
          className="danger"
          onClick={() => updateStatus(contract, ContractStatus.REVOKED)}
        >
          Revoke
        </button>
      </div>
    );
  }

  if (state.contracts.length === 0) {
    return <p>No contracts created yet.</p>;
  }

  return (
    <div className="contract-list">
      <h3>Contracts</h3>

      <ul>
        {state.contracts.map((contract) => (
          <li key={contract.id} className="contract-item">
            <div className="contract-info">
              <strong>{contract.name}</strong>
              <span className="status">
                {' '}
                — {contract.status}
              </span>
            </div>

            {renderActions(contract)}
          </li>
        ))}
      </ul>
    </div>
  );
}
