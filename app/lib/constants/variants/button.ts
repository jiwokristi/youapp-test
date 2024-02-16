import { cva } from 'class-variance-authority';

const variants = {
  solid: '!text-white',
  outlined: 'font-medium !bg-white border-2 hover:!bg-white-shade-1',
};

const sizes = {
  md: 'px-24 py-16 font-semibold tracking-0.25',
};

const colors = {
  primary: [
    'text-primary',
    'bg-primary',
    'border-primary',
    'hover:bg-primary-shade-1',
    'active:bg-primary-shade-1',
  ],
};

export type ButtonVariants = keyof typeof variants;
export type ButtonSizes = keyof typeof sizes;
export type ButtonColors = keyof typeof colors;

export const buttonVariants = cva(
  'flex items-center justify-center text-16 transition-all ease-in disabled:cursor-not-allowed',
  {
    variants: {
      variant: variants,
      size: sizes,
      color: colors,
    },
    defaultVariants: {
      variant: 'solid',
      size: 'md',
      color: 'primary',
    },
  },
);
