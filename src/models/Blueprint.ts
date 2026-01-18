export type FieldType = 'Text' | 'Date' | 'Signature' | 'Checkbox';

export interface BlueprintField {
  id: string;
  type: FieldType;
  label: string;
  position: {
    x: number;
    y: number;
  };
}

export interface Blueprint {
  id: string;
  name: string;
  fields: BlueprintField[];
  createdAt: string;
  locked?: boolean; // 👈 NEW
}
