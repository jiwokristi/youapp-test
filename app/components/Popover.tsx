'use client';

import { useContext } from 'react';
import clsx from 'clsx';

import { ToastContext } from '@/lib/contexts/toast';

interface PopoverProps extends React.ComponentProps<'div'> {
  position: 'left' | 'right';
  toggleComponent: React.ReactNode;
  classes?: string;
}

export const Popover = ({
  position,
  toggleComponent,
  classes = '',
  children,
  ...props
}: PopoverProps) => {
  const { open, onToggle } = useContext(ToastContext);

  return (
    <div className="relative" {...props}>
      <button type="button" onClick={() => onToggle()}>
        {toggleComponent}
      </button>
      <div
        className={clsx(
          `absolute bottom-0 z-10 w-max text-14 font-semibold shadow-xl transition-all ease-in ${classes}`,
          {
            'left-0': position === 'left',
            'right-0': position === 'right',
            'translate-y-32 opacity-100': open,
            'pointer-events-none translate-y-0 opacity-0': !open,
          },
        )}
      >
        {children}
      </div>
    </div>
  );
};
