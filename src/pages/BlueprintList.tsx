import { useContext } from 'react';
import { AppContext } from '../state/AppContext';
import { ContractStatus } from '../models/ContractStatus';
import './BlueprintList.css';

export default function BlueprintList() {
  const { state, dispatch } = useContext(AppContext);

  function createContract(blueprintId: string, name: string) {
    dispatch({
      type: 'ADD_CONTRACT',
      payload: {
        id: crypto.randomUUID(),
        name,
        blueprintId,
        status: ContractStatus.CREATED,
        values: {},
        createdAt: new Date().toISOString(),
      },
    });
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

          <button
            className="primary-btn"
            onClick={() => createContract(bp.id, bp.name)}
          >
            Create Contract
          </button>
        </div>
      ))}
    </>
  );
}
