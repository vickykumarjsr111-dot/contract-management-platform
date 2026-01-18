import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../state/AppContext';
import { ContractStatus } from '../models/ContractStatus';
import type { Blueprint } from '../models/Blueprint';
import './BlueprintList.css';

export default function BlueprintList() {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  function createContract(blueprint: Blueprint) {
    const contractId = crypto.randomUUID();

    dispatch({
      type: 'ADD_CONTRACT',
      payload: {
        id: contractId,
        name: blueprint.name,
        blueprintId: blueprint.id,
        status: ContractStatus.CREATED,
        values: {},
        createdAt: new Date().toISOString(),
      },
    });

    navigate('/dashboard');
  }

  if (state.blueprints.length === 0) {
    return <p>No blueprints created yet.</p>;
  }

  return (
    <>
      {state.blueprints.map((bp) => (
        <div key={bp.id} className="blueprint-item">
          <span>
            <strong>{bp.name}</strong> — {bp.fields.length} fields
          </span>

          {bp.locked ? (
            <span style={{ color: 'red', fontWeight: 'bold' }}>Locked</span>
          ) : (
            <button
              className="primary-btn"
              onClick={() => createContract(bp)}
            >
              Create Contract
            </button>
          )}
        </div>
      ))}
    </>
  );
}
