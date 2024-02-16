import { ButtonColors, ButtonVariants } from '@/lib/constants/variants/button';

export const getButtonLoadingColor = (
  variant: ButtonVariants,
  color: ButtonColors,
): string => {
  if (variant === 'outlined') {
    switch (color) {
      case 'secondary':
        return '#669BBC';

      default:
        return '#003049';
    }
  }
  return '#FFF';
};
