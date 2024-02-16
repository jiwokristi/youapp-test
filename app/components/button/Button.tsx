import { useFormStatus } from 'react-dom';
import type { VariantProps } from 'class-variance-authority';
import ReactLoading from 'react-loading';

import {
  ButtonColors,
  ButtonVariants,
  buttonVariants,
} from '@/lib/constants/variants/button';
import { getButtonLoadingColor } from '@/lib/helpers/getter';

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
  children,
  isDisabled = false,
  ...props
}: ButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button
      aria-disabled={pending || isDisabled}
      disabled={pending || isDisabled}
      className={`${buttonVariants({ variant, size, color })} ${classes}`}
      {...props}
    >
      {pending ? (
        <ReactLoading
          type="balls"
          width={32}
          height={32}
          color={getButtonLoadingColor(
            variant as ButtonVariants,
            color as ButtonColors,
          )}
        />
      ) : (
        children
      )}
    </button>
  );
};
