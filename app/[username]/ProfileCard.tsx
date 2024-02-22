import { Chip } from '@/components/Chip';
import { getAge } from '@/lib/helpers/getter';

import { User } from '@/lib/validations/user';

export default function ProfileCard({ user }: { user: User }) {
  return (
    <div className="mb-24 flex h-[19rem] w-full flex-col justify-end gap-12 rounded-2xl bg-initial-state-light p-16">
      <p className="text-16 font-bold">
        @{user?.username},{' '}
        {user?.profile?.dob && getAge(user?.profile?.dob as string)}
      </p>
      <p className="text-[1.3rem]">{user?.profile?.gender || ''}</p>
      <div className="flex items-center gap-8">
        {user?.profile?.horoscope && (
          <Chip>
            <span>{user?.profile?.horoscope}</span>
          </Chip>
        )}
        {user?.profile?.zodiac && (
          <Chip>
            <span>{user?.profile?.zodiac}</span>
          </Chip>
        )}
      </div>
    </div>
  );
}
