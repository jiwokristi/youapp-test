import { cva } from 'class-variance-authority';

export const variants = {
  outlined: 'border-2',
  plain: 'border-b-2',
};

const sizes = {
  md: 'p-16',
};

const colors = {
  primary: 'border-primary caret-primary',
};

export type InputVariants = keyof typeof variants;

export const inputVariants = cva(
  'peer w-full text-16 placeholder-gray-500 bg-white disabled:cursor-not-allowed disabled:bg-gray-500/20',
  {
    variants: {
      variant: variants,
      size: sizes,
      color: colors,
    },
    defaultVariants: {
      variant: 'outlined',
      size: 'md',
      color: 'primary',
    },
  },
);
