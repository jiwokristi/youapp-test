import { ForwardedRef, forwardRef } from 'react';
import type { VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

import { inputVariants } from '@/lib/constants/variants/input';

/**
 *  * How to implement a search feature:
 *  @property {HTMLInputTypeAttribute} type
 *  The type of the input element. It should be "search".
 *
 *  @property {ChangeEventHandler} onChange
 *  The change event listener of the input element. You should import searchHandler from useSearch and pass in event.target.value as the argument.
 *
 *  @example
 *  import { useSearch } from '@/lib/hooks/useSearch'
 *
 *  const { searchHandler } = useSearch({})
 *
 *  onChange={(e) => searchHandler(e.target.value)}
 *
 *
 *  @property {HTMLAttributes} defaultValue
 *  You should import searchParams from useSearch and get "query" for the defaultValue.
 *  ? Because if the user reloads the page the params will stay correct.
 *  ? Because if the user pastes the url from somewhere else the input element will be populated with the correct value.
 *  @example
 *  import { useSearch } from '@/lib/hooks/useSearch'
 *
 *  const { searchParams, searchHandler } = useSearch({})
 *
 *  defaultValue={searchParams.get('query')?.toString()}
 *  
 *  * Icons style guide:
 *  @property {ReactNode} startIcon
 *  @property {ReactNode} endIcon
 *  The width and height of the icons should be 16px for them to look good.
 *  
 *  @example
 *  import { Eye, EyeOff } from 'lucide-react'
 *  
 *  const [reveal, setReveal] = useState(false)
 *  
 *  endIcon={
          reveal ? (
            <Eye width={16} height={16} />
          ) : (
            <EyeOff width={16} height={16} />
          )
    }
 */

export interface InputProps
  extends Omit<React.ComponentProps<'input'>, 'size' | 'color'>,
    VariantProps<typeof inputVariants> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  inputClasses?: string;
  containerClasses?: string;
  label?: string;
  errorMessage?: string;
  onIconClick?: () => void;
}

const Input = (
  {
    startIcon,
    endIcon,
    inputClasses = '',
    containerClasses = '',
    label,
    variant,
    size,
    color,
    errorMessage,
    onIconClick,
    ...props
  }: InputProps,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  return (
    <div
      ref={ref}
      className={`flex w-full flex-col-reverse ${containerClasses}`}
    >
      {errorMessage && (
        <span className="mt-8 text-12 font-medium tracking-0.1 text-red">
          {errorMessage}
        </span>
      )}

      <div className="relative">
        {startIcon && (
          <div
            id="StartIcon"
            onClick={onIconClick}
            className={clsx(
              'absolute left-16 top-1/2 z-10 flex h-fit -translate-y-1/2 items-center [&>svg]:stroke-gray-500 [&>svg]:text-gray-500',
              {
                'cursor-pointer': onIconClick,
                'pointer-events-none': !onIconClick,
              },
            )}
          >
            {startIcon}
          </div>
        )}
        <input
          type="text"
          className={clsx(
            `${inputVariants({ variant, size, color })} ${inputClasses}`,
            {
              'pl-48': startIcon,
              'pr-48': endIcon,
            },
          )}
          placeholder="Search"
          {...props}
        />
        {endIcon && (
          <div
            id="EndIcon"
            onClick={onIconClick}
            className={clsx(
              'absolute right-16 top-1/2 z-10 flex h-fit -translate-y-1/2 items-center [&>svg]:stroke-gray-500 [&>svg]:text-gray-500',
              {
                'cursor-pointer': onIconClick,
                'pointer-events-none': !onIconClick,
              },
            )}
          >
            {endIcon}
          </div>
        )}
        {label && (
          <label
            htmlFor={props.name}
            className="absolute -top-24 left-0 text-14 transition-all ease-in peer-focus:text-primary-shade-2"
          >
            {label}
          </label>
        )}

        {/* ----- Border Animation ----- */}
        {variant === 'plain' && (
          <>
            <span className="absolute bottom-0 left-0 h-[0.205rem] w-0 bg-primary transition-all ease-in peer-focus:w-1/2">
              &nbsp;
            </span>
            <span className="absolute bottom-0 right-0 h-[0.205rem] w-0 bg-primary transition-all ease-in peer-focus:w-1/2">
              &nbsp;
            </span>
          </>
        )}
      </div>
    </div>
  );
};

// Forward the ref to the inner input element
const ForwardedInput = forwardRef<HTMLInputElement, InputProps>(Input);

export { ForwardedInput as Input };
