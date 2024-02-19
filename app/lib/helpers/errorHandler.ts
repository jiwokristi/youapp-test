import { ErrorState } from '@/lib/constants/error-state';

/**
 *  * How to implement errorBEHandler:
 *  @param {Error} error
 *  The error you get after throwing an error instance in a try/catch block.
 * 
 *  @returns {string}
 *  The string of the custom error message you're going to use in error.tsx.
 *  
 *  @description
 *  You should import this function, and return it in a useMemo in an error.tsx file.
 * 
 *  @example
 *  import { errorBEHandler } from '@/lib/helpers/errorHandler'
 * 
 *  const description = useMemo(() => {
      return errorBEHandler(error)
    }, [error])
  
    <p className="text-14 leading-paragraph mb-32">{description}</p>
 */

type ErrorParams = (Error & { digest?: string }) | ErrorState;

export const errorBEHandler = (error: ErrorParams): string => {
  switch (error.message) {
    case 'Invalid credentials':
      return 'It seems that you submitted the wrong email or password.';
    case 'Something went wrong':
      return 'It seems that something went wrong here.';

    default:
      return '';
  }
};
