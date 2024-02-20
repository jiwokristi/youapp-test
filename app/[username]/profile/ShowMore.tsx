import { Tridots } from '@/components/icons';
import { Popover } from '@/components/Popover';

import { signOutUser } from '@/lib/actions/auth';

export default function ShowMore() {
  return (
    <Popover position="right" toggleComponent={<Tridots />}>
      <ul>
        <li className="cursor-pointer bg-initial-state-medium text-right transition-all ease-in first:rounded-t-md last:rounded-b-md hover:bg-initial-state">
          <form action={signOutUser}>
            <button className="px-16 py-8 tracking-0.25">Sign out</button>
          </form>
        </li>
      </ul>
    </Popover>
  );
}
