import { useState } from 'react';
import { AppContext } from '../state/AppContext';
import type { Blueprint, BlueprintField } from '../models/Blueprint';
import './ContractForm.css';

interface Props {
  blueprint: Blueprint;
}

export default function ContractForm({ blueprint }: Props) {
  const [formData, setFormData] = useState<Record<string, string | File>>({});

  function handleChange(fieldId: string, value: string | File) {
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

            {field.type === 'Checkbox' ? (
              <input
                type="checkbox"
                aria-label={field.label}
                checked={formData[field.id] === 'true'}
                onChange={(e) =>
                  handleChange(field.id, e.target.checked ? 'true' : 'false')
                }
              />
            ) : field.type === 'Signature' ? (
              /* SIGNATURE FILE INPUT */
              <>
                <input
                  type="file"
                  accept="image/*"
                  aria-label={field.label}
                  onChange={(e) =>
                    handleChange(field.id, e.target.files?.[0] || '')
                  }
                />
                {formData[field.id] && formData[field.id] instanceof File && (
                  <img
                    src={URL.createObjectURL(formData[field.id] as File)}
                    alt="Signature Preview"
                    style={{ maxWidth: '200px', maxHeight: '100px', marginTop: '10px' }}
                  />
                )}
              </>
            ) : (
              /* NORMAL INPUT */
              <input
                type={field.type === 'Date' ? 'date' : 'text'}
                placeholder={field.label}
                value={formData[field.id] as string || ''}
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
