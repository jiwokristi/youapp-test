import { Suspense } from 'react';

import { Skeleton } from '@/components/Skeleton';

import { User } from '@/lib/validations/user';

import EditButton from './EditButton';
import InterestValues from './InterestValues';

export default function InterestCard({
  user,
  userSessionId,
}: {
  user: User | null;
  userSessionId: string | null;
}) {
  return (
    <div className="relative min-h-[12rem] w-full rounded-2xl bg-initial-state-medium p-24 pl-32">
      {userSessionId && userSessionId === user?.id && (
        <EditButton fieldName="interest" username={user?.username} />
      )}
      <span className="mb-32 inline-block text-14 font-bold">Interest</span>
      <Suspense fallback={<Skeleton />}>
        <InterestValues userId={user?.id as string} />
      </Suspense>
    </div>
  );
}
