import { useState } from 'react';
import type { Blueprint, BlueprintField } from '../models/Blueprint';
import './ContractForm.css';

interface Props {
  blueprint: Blueprint;
}

export default function ContractForm({ blueprint }: Props) {
  const [formData, setFormData] = useState<Record<string, string>>({});

  function handleChange(fieldId: string, value: string) {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  }

  function handleSubmit() {
    console.log('Saved Contract:', {
      blueprintName: blueprint.name,
      fields: formData,
    });

    alert('Contract saved successfully');
  }

  return (
    <div className="contract-page">
      <div className="contract-card">
        <h2>{blueprint.name}</h2>

        {blueprint.fields.map((field: BlueprintField) => (
          <div key={field.id} className="form-group">
            <label>{field.label}</label>

            {/* GENDER FIELD */}
            {field.type === 'gender' ? (
              <select
                aria-label={field.label}
                value={formData[field.id] || ''}
                onChange={(e) =>
                  handleChange(field.id, e.target.value)
                }
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              /* NORMAL INPUT */
              <input
                type={
                  field.type === 'email'
                    ? 'email'
                    : field.type === 'number'
                    ? 'number'
                    : field.type === 'date'
                    ? 'date'
                    : 'text'
                }
                placeholder={field.label}
                value={formData[field.id] || ''}
                onChange={(e) =>
                  handleChange(field.id, e.target.value)
                }
              />
            )}
          </div>
        ))}

        <button className="primary-btn" onClick={handleSubmit}>
          Submit Contract
        </button>
      </div>
    </div>
  );
}
