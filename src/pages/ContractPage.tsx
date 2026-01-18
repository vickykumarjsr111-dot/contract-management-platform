import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../state/AppContext';
import { ContractStatus } from '../models/ContractStatus';
import ContractForm from './ContractForm';

export default function ContractPage() {
  const { id } = useParams<{ id: string }>();
  const { state, dispatch } = useContext(AppContext);

  const contract = state.contracts.find(c => c.id === id);
  const blueprint = state.blueprints.find(bp => bp.id === contract?.blueprintId);

  if (!contract || !blueprint) {
    return <p style={{ padding: '40px' }}>Contract or Blueprint not found</p>;
  }

  function updateStatus(status: ContractStatus) {
    if (!contract) return;
    dispatch({
      type: 'UPDATE_CONTRACT_STATUS',
      payload: {
        id: contract.id,
        status,
      },
    });

    // Lock the blueprint when contract is locked
    if (status === ContractStatus.LOCKED) {
      dispatch({
        type: 'LOCK_BLUEPRINT',
        payload: {
          id: contract.blueprintId,
        },
      });
    }
  }

  function removeContract() {
    if (!contract) return;
    dispatch({
      type: 'REMOVE_CONTRACT',
      payload: {
        id: contract.id,
      },
    });
    dispatch({
      type: 'REMOVE_BLUEPRINT',
      payload: {
        id: contract.blueprintId,
      },
    });
  }

  return (
    <div style={{ padding: '40px' }}>
      <h2>{contract.name}</h2>

      <p>
        Current Status: <strong>{contract.status}</strong>
      </p>

      <ContractForm blueprint={blueprint} />

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        {contract.status === ContractStatus.CREATED && (
          <>
            <button onClick={() => updateStatus(ContractStatus.APPROVED)}>
              Approve
            </button>
            <button onClick={removeContract} style={{ backgroundColor: 'red', color: 'white' }}>
              Remove
            </button>
          </>
        )}

        {contract.status === ContractStatus.APPROVED && (
          <button onClick={() => updateStatus(ContractStatus.SENT)}>
            Send
          </button>
        )}

        {contract.status === ContractStatus.SENT && (
          <button onClick={() => updateStatus(ContractStatus.SIGNED)}>
            Sign
          </button>
        )}

        {contract.status === ContractStatus.SIGNED && (
          <button onClick={() => updateStatus(ContractStatus.LOCKED)}>
            Lock
          </button>
        )}

        {contract.status === ContractStatus.LOCKED && (
          <p style={{ color: 'green', fontWeight: 'bold' }}>Contract is locked and cannot be modified.</p>
        )}
      </div>
    </div>
  );
}
