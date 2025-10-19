import { cn } from '@/lib/utils';
import { LogOutIcon } from 'lucide-react';
import { Button } from './ui/button';

export default function NavBar() {
  return (
    <nav className={cn('p-4 flex items-center justify-between border-b-2')}>
      <h1 className="text-3xl font-semibold">Todo List</h1>

      {false && (
        <Button variant={'destructive'} size={'lg'}>
          Log Out
          <LogOutIcon />
        </Button>
      )}
    </nav>
  );
}
