'use client';

import { usePathname, useParams } from 'next/navigation';

import { Back } from '@/components/button';

import ShowMore from './ShowMore';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { username } = useParams();

  const onInterestPage = pathname.split('/').at(-1) === 'interest';

  return (
    <section
      id="Page__Profile"
      className="flex min-h-screen flex-col items-center py-96 smaller-tablets:justify-center landscape-tablets:py-48"
    >
      <div className="relative mb-24 flex w-full items-center justify-between">
        <Back classes="-translate-x-12" />
        {!onInterestPage && <ShowMore />}
        {!onInterestPage && (
          <span className="absolute left-1/2 -translate-x-1/2 text-14 font-semibold">
            @{username}
          </span>
        )}
        {onInterestPage && (
          <button
            type="button"
            className="text-blue-gradient w-fit text-14 font-semibold"
          >
            Save
          </button>
        )}
      </div>
      {children}
    </section>
  );
}
