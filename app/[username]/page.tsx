import { Suspense } from 'react';
import { notFound } from 'next/navigation';

import { Back } from '@/components/button';
import { Skeleton } from '@/components/Skeleton';

import { getUser } from '@/lib/actions/user';

import auth from '../../middleware';

import ShowMore from './ShowMore';
import ProfileCard from './ProfileCard';
import AboutForm from './AboutForm';
import InterestCard from './InterestCard';
import AboutValues from './AboutValues';

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;

  const session = await auth();
  const user = await getUser({ username, include: ['profile'] });

  if (!user) {
    notFound();
  }

  return (
    <section
      id="Page__Profile"
      className="flex min-h-screen flex-col items-center py-96 smaller-tablets:justify-center"
    >
      <div className="relative mb-24 flex w-full max-w-[50rem] items-center justify-between">
        <Back classes="-translate-x-12" />
        <ShowMore />
        <span className="absolute left-1/2 -translate-x-1/2 text-14 font-semibold">
          @{username}
        </span>
      </div>
      <ProfileCard user={user} />
      <AboutForm user={user} userSessionId={session?.user?.id || null}>
        <Suspense fallback={<Skeleton />}>
          <AboutValues username={username} />
        </Suspense>
      </AboutForm>
      <InterestCard user={user} userSessionId={session?.user?.id || null} />
    </section>
  );
}
