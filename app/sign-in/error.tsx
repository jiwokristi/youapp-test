'use client';

import { useMemo } from 'react';

import { Button } from '@/components/button';

import { errorBEHandler } from '@/lib/helpers/errorHandler';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const description = useMemo(() => {
    return errorBEHandler(error);
  }, [error]);

  return (
    <section id="Error__Root" className="relative h-[calc(100vh_-_8rem)] py-96">
      <div className="md:w-[40rem] absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center">
        <h2 className="mb-16 text-44">WHOOPS!</h2>
        <p className="mb-32 text-14 leading-paragraph">{description}</p>
        <Button onClick={reset}>TRY AGAIN</Button>
      </div>
    </section>
  );
}
