import { createContext } from 'react';

export interface Toggle {
  open: boolean;
  fields: string[];
  onToggle: () => void;
  onToggleFields: (name: string) => void;
}

export const toggleDefaults: Toggle = {
  open: false,
  fields: [],
  onToggle: () => {},
  onToggleFields: name => {},
};

export const ToggleContext = createContext<Toggle>(toggleDefaults);
