import { createContext, ReactNode } from 'react';

import { Toggle, toggleDefaults } from './toggle';

export interface Toast extends Toggle {
  title: string;
  description: string;
  icon?: ReactNode;
}

export const ToastContext = createContext<Toast>({
  ...toggleDefaults,
  title: '',
  description: '',
  icon: null,
});
