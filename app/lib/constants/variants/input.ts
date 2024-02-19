import { cva } from 'class-variance-authority';

export const variants = {
  solid: 'border-0',
  outlined: 'border',
};

const sizes = {
  md: 'p-16',
  sm: 'p-[0.925rem]',
};

const colors = {
  primary: ['bg-primary', 'border-primary', 'caret-white'],
  white: ['bg-gray/5', 'border-white/20', 'caret-white'],
};

const alignments = {
  left: 'text-left',
  right: 'text-right',
};

export type InputVariants = keyof typeof variants;
export type InputSizes = keyof typeof sizes;
export type InputColors = keyof typeof colors;
export type InputAlignments = keyof typeof alignments;

export const inputVariants = cva(
  'peer w-full text-[1.3rem] placeholder-white/40 disabled:cursor-not-allowed',
  {
    variants: {
      variant: variants,
      size: sizes,
      color: colors,
      align: alignments,
    },
    defaultVariants: {
      variant: 'solid',
      size: 'md',
      color: 'primary',
      align: 'left',
    },
  },
);
