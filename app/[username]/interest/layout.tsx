import { notFound } from 'next/navigation';
import auth from '../../../middleware';

import { Back } from '@/components/button';

import { getUser, saveInterest } from '@/lib/actions/user';

import Form from './Form';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { username: string };
}) {
  const { username } = params;

  const session = await auth();
  const user = await getUser({ username, include: ['interest'] });

  if (user?.id !== session?.user?.id || !user) {
    notFound();
  }

  const actionWithArgs = saveInterest.bind(
    null,
    session?.user?.id as string,
    username,
  );

  return (
    <section
      id="Page__Interest"
      className="min-h-screen py-96 landscape-tablets:py-48"
    >
      <form id="Form__Interest" noValidate action={actionWithArgs}>
        <div className="relative mb-96 flex w-full items-center justify-between">
          <Back classes="-translate-x-12" />
          <button className="text-blue-gradient w-fit text-14 font-semibold">
            Save
          </button>
        </div>
        {children}
        <Form initialValues={user?.interest || []} />
      </form>
    </section>
  );
}
