'use server';

import { redirect } from 'next/navigation';
import { unstable_noStore as noStore, revalidatePath } from 'next/cache';

import prisma from '@/lib/db';

import { Interest, User } from '@/lib/validations/user';

type IncludeOption = Array<'profile' | 'interest'>;

interface GetUserArgs {
  email?: string;
  username?: string;
  id?: string;
  include?: IncludeOption;
}

export const getUser = async ({
  email,
  username,
  id,
  include,
}: GetUserArgs): Promise<User | null> => {
  try {
    noStore();

    const user: User | null = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email,
          },
          {
            username: email || username,
          },
          {
            id,
          },
        ],
      },
      include: {
        profile: include?.includes('profile'),
        interest: include?.includes('interest'),
      },
    });

    return user;
  } catch (error) {
    console.log('ERROR GET USER ----->', error);
    return null;
  }
};

export const getInterests = async (
  userId: string,
): Promise<Interest[] | null> => {
  try {
    noStore();

    const interests: Interest[] | null = await prisma.interest.findMany({
      where: {
        userId,
      },
    });

    return interests;
  } catch (error) {
    console.log('ERROR GET INTERESTS ----->', error);
    return null;
  }
};

export const saveProfile = async (
  date: string,
  profileId: string,
  isDirty: string,
  username: string,
  formData: FormData,
) => {
  try {
    if (!JSON.parse(isDirty)) {
      return null;
    }

    const payload = {
      displayName: formData.get('displayName') as string,
      gender: formData.get('gender') as string,
      dob: date as string,
      horoscope: formData.get('horoscope') as string,
      zodiac: formData.get('zodiac') as string,
      height: formData.get('height') as string,
      weight: formData.get('weight') as string,
    };

    await prisma.profile.update({
      where: {
        id: +profileId,
      },
      data: {
        ...payload,
      },
    });
  } catch (error) {
    console.log('ERROR SAVE PROFILE ----->', error);
  }

  revalidatePath(`/${username}`);
  redirect(`/${username}`);
};

export const saveInterest = async (
  userId: string,
  username: string,
  formData: FormData,
) => {
  try {
    const extractedData = formData.getAll('name');

    const existingInterests = await prisma.interest.findMany({
      where: {
        userId,
      },
    });

    if (existingInterests.length > 0) {
      await prisma.interest.deleteMany({
        where: {
          userId,
        },
      });

      if (extractedData[0] === '') {
        return;
      }
    }

    const payload = extractedData.map(name => ({
      name: name as string,
      userId,
    }));

    await prisma.interest.createMany({
      data: [...payload],
    });
  } catch (error) {
    console.log('ERROR SAVE INTEREST ----->', error);
  }

  revalidatePath(`/${username}`);
  redirect(`/${username}`);
};
