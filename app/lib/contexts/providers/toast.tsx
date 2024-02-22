'use client';

import { useState, ReactNode, useEffect } from 'react';

import { Toast as ToastComponent } from '@/components/Toast';

import { ToastContext, Toast } from '@/lib/contexts/toast';

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [
    { variant, open, fields, message, openDuration, onToggle, onToggleFields },
    set,
  ] = useState<Toast>({
    variant: 'success',
    open: false,
    fields: [],
    message: '',
    openDuration: undefined,
    onToggle: (message, variant, openDuration) =>
      set(p => ({
        ...p,
        open: !p.open,
        message: message || '',
        variant: variant || 'success',
        openDuration,
      })),
    onToggleFields: name => {
      set(p => ({
        ...p,
        fields: p.fields.includes(name)
          ? p.fields.filter(field => field !== name)
          : p.fields.concat(name),
      }));
    },
  });

  useEffect(() => {
    if (open && openDuration) {
      setTimeout(() => {
        set(p => ({
          ...p,
          open: false,
          message: '',
          variant: 'success',
        }));
      }, openDuration);
    }
  }, [openDuration, open]);

  const value = {
    variant,
    open,
    fields,
    message,
    openDuration,
    onToggle,
    onToggleFields,
  };

  return (
    <ToastContext.Provider value={value}>
      <ToastComponent
        open={open && (!!message || !!openDuration)}
        message={message}
        variant={variant}
      />
      {children}
    </ToastContext.Provider>
  );
};
