import { Chip } from '@/components/Chip';

import { getInterests } from '@/lib/actions/user';

export default async function InterestValues({ userId }: { userId: string }) {
  const interests = await getInterests(userId);

  if (interests && interests?.length > 0) {
    return (
      <div className="mb-32 flex flex-wrap gap-8 transition-all ease-in">
        {interests.map(item => (
          <Chip key={item.id}>{item.name}</Chip>
        ))}
      </div>
    );
  }

  return (
    <p className="mb-32 text-14 leading-medium opacity-50">
      Add in your interest to find a better match
    </p>
  );
}
