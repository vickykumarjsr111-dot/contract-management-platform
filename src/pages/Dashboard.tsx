import { useContext } from 'react';
import { AppContext } from '../state/AppContext';
import BlueprintList from './BlueprintList';
import './Dashboard.css';

export default function Dashboard() {
  const { state } = useContext(AppContext);

  return (
    <div className="dashboard-page">
      <h2 className="dashboard-title">Saved Blueprints</h2>

      {state.blueprints.length === 0 ? (
        <p className="empty-text">No blueprints created yet.</p>
      ) : (
        <BlueprintList />
      )}
    </div>
  );
}
