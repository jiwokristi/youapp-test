import { forwardRef, ForwardedRef, ComponentProps } from 'react';
import clsx from 'clsx';

interface CheckboxProps extends ComponentProps<'input'> {
  label?: string;
  direction?: 'row' | 'column' | 'row-reverse';
  containerClasses?: string;
}

const Checkbox = (
  {
    label,
    direction = 'column',
    containerClasses = '',
    ...props
  }: CheckboxProps,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  return (
    <div
      ref={ref}
      className={clsx(`flex gap-16 ${containerClasses}`, {
        'flex-col': direction === 'column',
        'flex-row items-center': direction === 'row',
        'flex-row-reverse items-center justify-end':
          direction === 'row-reverse',
      })}
    >
      <input
        className="hover:checked:border-primary-shade-1 hover:checked:bg-primary-shade-1 relative inline-block h-[2rem] w-[2rem] cursor-pointer appearance-none rounded-md border-2 border-primary bg-white transition-all ease-in checked:bg-primary checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 checked:after:text-14 checked:after:text-white checked:after:content-['\2714'] hover:bg-shade-white-1 active:border-primary active:bg-primary"
        type="checkbox"
        {...props}
      />

      {label && (
        <label htmlFor={props.name} className="text-16">
          {label}
        </label>
      )}
    </div>
  );
};

const ForwardedCheckbox = forwardRef<HTMLInputElement, CheckboxProps>(Checkbox);

export { ForwardedCheckbox as Checkbox };
