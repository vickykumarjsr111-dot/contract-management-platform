import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Contract } from '../models/Contract';
import type { Blueprint } from '../models/Blueprint';
import { ContractStatus } from '../models/ContractStatus';
import './ContractTable.css';

interface Props {
  contracts: Contract[];
  blueprints: Blueprint[];
  dispatch: any;
}

function getStatusInfo(status: ContractStatus) {
  if (status === ContractStatus.LOCKED) return { label: 'Active', color: 'green' };
  if (status === ContractStatus.SIGNED) return { label: 'Signed', color: 'blue' };
  return { label: 'Pending', color: 'orange' };
}

function getBlueprintName(blueprints: Blueprint[], blueprintId: string) {
  return blueprints.find(bp => bp.id === blueprintId)?.name || 'Unknown';
}

export default function ContractTable({ contracts, blueprints, dispatch }: Props) {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<'All' | 'Pending' | 'Signed'>('All');

  const filteredContracts = contracts.filter(contract => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Pending') return contract.status !== ContractStatus.LOCKED && contract.status !== ContractStatus.SIGNED;
    if (activeFilter === 'Signed') return contract.status === ContractStatus.SIGNED;
    return true;
  });

  function handleSign(contract: Contract) {
    if (contract.status === ContractStatus.SENT) {
      dispatch({
        type: 'UPDATE_CONTRACT_STATUS',
        payload: {
          id: contract.id,
          status: ContractStatus.SIGNED,
        },
      });
    }
  }

  return (
    <div>
      <div className="filter-container">
        <button
          onClick={() => setActiveFilter('All')}
          className={activeFilter === 'All' ? 'active-filter' : 'inactive-filter'}
        >
          All
        </button>
        <button
          onClick={() => setActiveFilter('Pending')}
          className={activeFilter === 'Pending' ? 'active-filter' : 'inactive-filter'}
        >
          Pending
        </button>
        <button
          onClick={() => setActiveFilter('Signed')}
          className={activeFilter === 'Signed' ? 'active-filter' : 'inactive-filter'}
        >
          Signed
        </button>
      </div>

      <table className="contract-table">
        <thead>
          <tr>
            <th>Contract Name</th>
            <th>Blueprint Name</th>
            <th>Status</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredContracts.map(contract => {
            const statusInfo = getStatusInfo(contract.status);
            const blueprintName = getBlueprintName(blueprints, contract.blueprintId);
            const createdDate = new Date(contract.createdAt).toISOString().split('T')[0];

            return (
              <tr key={contract.id}>
                <td>{contract.name}</td>
                <td>{blueprintName}</td>
                <td>
                  <span className={`status-${statusInfo.label.toLowerCase()}`}>
                    {statusInfo.label}
                  </span>
                </td>
                <td>{createdDate}</td>
                <td>
                  <button
                    onClick={() => navigate(`/contracts/${contract.id}`)}
                    className="view-btn"
                  >
                    View
                  </button>
                  {contract.status === ContractStatus.SENT && (
                    <button
                      onClick={() => handleSign(contract)}
                      className="sign-btn"
                    >
                      Sign
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {filteredContracts.length === 0 && (
        <p className="empty-message">No contracts found.</p>
      )}
    </div>
  );
}
