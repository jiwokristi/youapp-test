'use client';

import { useState, ReactNode } from 'react';

import { ToastContext, Toast } from '@/lib/contexts/toast';

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [{ open, title, description, fields, onToggle, onToggleFields }, set] =
    useState<Toast>({
      open: false,
      title: '',
      description: '',
      fields: [],
      onToggle: () => set(p => ({ ...p, open: !p.open })),
      onToggleFields: name => {
        set(p => ({
          ...p,
          fields: p.fields.includes(name)
            ? p.fields.filter(field => field !== name)
            : p.fields.concat(name),
        }));
      },
    });

  const value = {
    open,
    title,
    description,
    fields,
    onToggle,
    onToggleFields,
  };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};
