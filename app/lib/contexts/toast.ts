import { createContext } from 'react';

type ToastVariants = 'success' | 'danger';
export interface Toast {
  variant: ToastVariants;
  open: boolean;
  fields: string[];
  message: string;
  openDuration?: number;
  onToggle: (
    message?: string,
    variant?: ToastVariants,
    openDuration?: number,
  ) => void;
  onToggleFields: (name: string) => void;
}

export const ToastContext = createContext<Toast>({
  variant: 'success',
  open: false,
  fields: [],
  message: '',
  openDuration: undefined,
  onToggle: (message, variant, openDuration) => {},
  onToggleFields: name => {},
});
