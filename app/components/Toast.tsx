import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import clsx from 'clsx';

export interface ToastProps {
  open: boolean;
  message: string;
  variant: 'success' | 'danger';
}

export const Toast = ({ open, message, variant }: ToastProps) => {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalElement(document?.querySelector<HTMLElement>('#portal'));
  }, []);

  return portalElement !== null ? (
    <>
      {ReactDOM.createPortal(
        <div
          className={clsx(
            'fixed left-0 right-0 top-0 z-[9999] p-16 transition-all duration-300 ease-in',
            {
              'visible translate-y-0': open && message,
              'invisible -translate-y-full': !open,
              'bg-primary': variant === 'success',
              'bg-red-500': variant === 'danger',
            },
          )}
        >
          <p className="mx-auto w-fit text-14 text-white">{message}</p>
        </div>,
        portalElement,
      )}
    </>
  ) : null;
};
