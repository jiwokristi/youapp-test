import { cva } from 'class-variance-authority';

const variants = {
  solid: '!text-white',
};

const sizes = {
  md: 'px-24 py-16 font-bold tracking-0.25',
};

const colors = {
  'blue-gradient': ['bg-gradient-blue', 'disabled:opacity-30'],
};

const shadowSizes = {
  'glow-xl': [
    'shadow-xl',
    'shadow-glow/30',
    'duration-300',
    'hover:shadow-glow/40',
    'active:shadow-glow/40',
    'disabled:shadow-glow/0',
  ],
};

export type ButtonVariants = keyof typeof variants;
export type ButtonSizes = keyof typeof sizes;
export type ButtonColors = keyof typeof colors;
export type ButtonShadowSizes = keyof typeof shadowSizes;

export const buttonVariants = cva(
  'flex items-center justify-center text-16 transition-all ease-in disabled:cursor-not-allowed',
  {
    variants: {
      variant: variants,
      size: sizes,
      color: colors,
      shadowSize: shadowSizes,
    },
    defaultVariants: {
      variant: 'solid',
      size: 'md',
      color: 'blue-gradient',
      shadowSize: 'glow-xl',
    },
  },
);
