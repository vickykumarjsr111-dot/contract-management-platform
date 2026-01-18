import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../state/AppContext';
import type { Blueprint, BlueprintField, FieldType } from '../models/Blueprint';
import { ContractStatus } from '../models/ContractStatus';
import './BlueprintBuilder.css';

export default function BlueprintBuilder() {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [fields, setFields] = useState<BlueprintField[]>([]);
  const [fieldLabel, setFieldLabel] = useState('');
  const [fieldType, setFieldType] = useState<FieldType>('Text');

  function addField() {
    if (!fieldLabel.trim()) {
      alert('Please enter a field label');
      return;
    }

    const newField: BlueprintField = {
      id: crypto.randomUUID(),
      label: fieldLabel,
      type: fieldType,
      position: { x: 0, y: 0 },
    };

    setFields((prev) => [...prev, newField]);
    setFieldLabel('');
    setFieldType('Text');
  }

  function saveBlueprint() {
    if (!name.trim()) {
      alert('Please enter a Blueprint Name');
      return;
    }

    if (fields.length === 0) {
      alert('Please add at least one field');
      return;
    }

    if (state.blueprints.some(bp => bp.name === name)) {
      alert('A blueprint with this name already exists');
      return;
    }

    const blueprint: Blueprint = {
      id: crypto.randomUUID(),
      name,
      fields,
      createdAt: new Date().toISOString(),
    };

    dispatch({
      type: 'ADD_BLUEPRINT',
      payload: blueprint,
    });

    // Also create a contract from the blueprint
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

    // Reset form
    setName('');
    setFields([]);
    setFieldLabel('');
    setFieldType('Text');

    alert('Blueprint saved successfully');

    // Navigate to dashboard
    navigate('/dashboard');
  }

  return (
    <div className="form-card">
      <h2>Create Blueprint</h2>

      {/* Blueprint name */}
      <div className="form-group">
        <label>Blueprint Name</label>
        <input
          placeholder="Your Contract"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <hr />

      <h3>Add Field</h3>

      {/* Field label */}
      <div className="form-group">
        <label>Field Label</label>
        <input
          placeholder="Your selected field label"
          value={fieldLabel}
          onChange={(e) => setFieldLabel(e.target.value)}
        />
      </div>

      {/* Field type */}
      <div className="form-group">
        <label>Field Type</label>
        <select
          aria-label="Field Type"
          value={fieldType}
          onChange={(e) => setFieldType(e.target.value as FieldType)}
        >
          <option value="Text">Text</option>
          <option value="Date">Date</option>
          <option value="Signature">Signature</option>
          <option value="Checkbox">Checkbox</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="button-row">
        <button onClick={addField}>Add Field</button>
        <button onClick={saveBlueprint}>Save Blueprint</button>
      </div>

      {/* Preview */}
      {fields.length > 0 && (
        <>
          <h4>Preview Fields</h4>
          <ul className="preview-list">
            {fields.map((f) => (
              <li key={f.id}>
                {f.label} <span>({f.type})</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
