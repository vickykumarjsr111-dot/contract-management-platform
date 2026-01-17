export type FieldType = 'text' | 'date' | 'signature' | 'checkbox';

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
}
