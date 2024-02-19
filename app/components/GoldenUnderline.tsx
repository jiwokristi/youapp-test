/**
 *  * How to implement the linear gradient underline:
 *  @description You have to import it and position it absolutely within a relatively positioned parent element. Use padding bottom to give it space from the adjacent element which you're trying to underline.
 * 
 *  @example
 *  import Link from 'next/link';
 * 
 *  import { GoldenUnderline } from '@/components/GoldenUnderline';
 *     
 *  <Link href="/register" className="text-golden group relative pb-4">
      <span>Register here</span>
      <GoldenUnderline />
    </Link>
 */

export const GoldenUnderline = () => {
  return (
    <span className="golden absolute inset-x-0 bottom-0 h-1 transition-all ease-in group-hover:opacity-0" />
  );
};
