'use client';

import { useRouter } from 'next/navigation';

import { ChevronLeft } from '@/components/icons';

export const Back = ({ classes = '' }: { classes?: string }) => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className={`flex w-fit items-center text-14 font-bold ${classes}`}
    >
      <ChevronLeft />
      <span>Back</span>
    </button>
  );
};
