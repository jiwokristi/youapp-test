'use client';

import { useContext } from 'react';
import clsx from 'clsx';

import { ToastContext } from '@/lib/contexts/toast';

export interface PopoverProps extends React.ComponentProps<'div'> {
  position: 'left' | 'right';
  toggleComponent: React.ReactNode;
  classes?: string;
  containerClasses?: string;
  toggleComponentClasses?: string;
  name: string;
}

export const Popover = ({
  position,
  toggleComponent,
  classes = '',
  containerClasses = '',
  toggleComponentClasses = '',
  name,
  children,
  ...props
}: PopoverProps) => {
  const { fields, onToggleFields } = useContext(ToastContext);

  return (
    <div className={`relative ${containerClasses}`} {...props}>
      <button
        type="button"
        className={toggleComponentClasses}
        onClick={() => onToggleFields(name)}
      >
        {toggleComponent}
      </button>
      <div
        className={clsx(
          `absolute bottom-0 z-10 w-max text-14 font-semibold shadow-xl transition-all ease-in ${classes}`,
          {
            'left-0': position === 'left',
            'right-0': position === 'right',
            'translate-y-full opacity-100': fields.includes(name),
            'pointer-events-none translate-y-0 opacity-0':
              !fields.includes(name),
          },
        )}
      >
        {children}
      </div>
    </div>
  );
};
