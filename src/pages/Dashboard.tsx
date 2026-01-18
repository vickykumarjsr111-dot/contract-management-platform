import { useContext } from 'react';
import { AppContext } from '../state/AppContext';
import ContractTable from '../components/ContractTable';
import './Dashboard.css';

export default function Dashboard() {
  const { state, dispatch } = useContext(AppContext);

  return (
    <div className="dashboard-page">
      <h2 className="dashboard-title">Contract Dashboard</h2>

      <ContractTable
        contracts={state.contracts}
        blueprints={state.blueprints}
        dispatch={dispatch}
      />
    </div>
  );
}
