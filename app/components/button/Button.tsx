'use client';

import { useFormStatus } from 'react-dom';
import type { VariantProps } from 'class-variance-authority';
import ReactLoading from 'react-loading';

import { buttonVariants } from '@/lib/constants/variants/button';

export interface ButtonProps
  extends Omit<React.ComponentProps<'button'>, 'color'>,
    VariantProps<typeof buttonVariants> {
  classes?: string;
  isDisabled?: boolean;
}

export const Button = ({
  classes = '',
  variant,
  size,
  color,
  shadowSize,
  children,
  isDisabled = false,
  ...props
}: ButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button
      aria-disabled={pending || isDisabled}
      disabled={pending || isDisabled}
      className={`${buttonVariants({ variant, size, color, shadowSize })} ${classes}`}
      {...props}
    >
      {pending ? (
        <ReactLoading type="balls" width={32} height={32} color="#FFF" />
      ) : (
        children
      )}
    </button>
  );
};
