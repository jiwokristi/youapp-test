import Image from 'next/image';
import clsx from 'clsx';

import { Chip } from '@/components/Chip';

import { getAge } from '@/lib/helpers/getter';

import { User } from '@/lib/validations/user';
import Link from 'next/link';

export default function ProfileCard({ user }: { user: User }) {
  const imageUrl = user?.profile?.image?.split('\\')?.at(-1);

  return (
    <div
      className={clsx(
        'relative mb-24 flex h-[19rem] w-full max-w-[50rem] flex-col justify-end gap-12 overflow-hidden rounded-2xl bg-initial-state-light p-16',
      )}
    >
      {user?.profile?.image && (
        <Link href={`${process.env.BASE_FILE_URL}/${imageUrl}`} target="_blank">
          <Image
            src={`${process.env.BASE_FILE_URL}/${imageUrl}`}
            alt="User image"
            width={1000}
            height={660}
            className="absolute inset-x-0 inset-y-0 brightness-75"
          />
        </Link>
      )}
      <p className="z-10 w-fit text-16 font-bold">
        @{user?.username},{' '}
        {user?.profile?.dob && getAge(user?.profile?.dob as string)}
      </p>
      <p className="z-10 w-fit text-[1.3rem]">{user?.profile?.gender || ''}</p>
      <div className="z-10 flex w-fit items-center gap-8">
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
