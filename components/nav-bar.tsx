import { signOut } from '@/action/auth';
import { auth } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { LogOutIcon } from 'lucide-react';
import { headers } from 'next/headers';
import { Button } from './ui/button';

export default async function NavBar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <nav className={cn('p-4 flex items-center justify-between border-b-2')}>
      <h1 className="text-4xl font-semibold">Todo List</h1>

      {session?.user && (
        <section className="flex items-center gap-4">
          <p>Hello, {session.user.name}!</p>

          <form action={signOut}>
            <Button variant={'destructive'} size={'lg'} className="cursor-pointer">
              Log Out
              <LogOutIcon />
            </Button>
          </form>
        </section>
      )}
    </nav>
  );
}
