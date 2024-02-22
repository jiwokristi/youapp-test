import dayjs from 'dayjs';

import { getUser } from '@/lib/actions/user';

import { About } from '@/lib/validations/user';

import { getAge } from '@/lib/helpers/getter';

import { aboutFormFields } from '@/lib/constants/form-fields';
import { slashFormat } from '@/lib/constants/date';

export default async function AboutValues({ username }: { username: string }) {
  const user = await getUser({ username, include: ['profile', 'interest'] });

  if (
    Object.values(user?.profile as About).filter(val => val !== null).length !==
    2
  ) {
    return (
      <div className="mb-32 flex flex-col gap-16 transition-all ease-in">
        {aboutFormFields.map(field =>
          user?.profile?.[field.name as keyof About] &&
          field.name !== 'image' ? (
            <div
              key={field.id}
              className="flex items-center gap-8 text-[1.3rem]"
            >
              <span className="opacity-30">{field.label}</span>
              <span>
                {field.name === 'dob'
                  ? `${dayjs(user.profile[field.name]).format(slashFormat)} (Age ${getAge(user.profile[field.name] as string)})`
                  : (user.profile[
                      field.name as keyof About
                    ] as React.ReactNode)}
              </span>
            </div>
          ) : null,
        )}
      </div>
    );
  }

  return (
    <p className="mb-32 text-14 leading-medium opacity-50">
      Add in your your to help others know you better
    </p>
  );
}
