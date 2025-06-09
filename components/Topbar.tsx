'use client';
import { UserResource } from '@clerk/types';
import ThemeToggle from './ThemeToggle';
import { LogOutIcon } from 'lucide-react';
import { useClerk } from '@clerk/nextjs';

export function Topbar({ user }: { user: UserResource | null }) {
  const { signOut } = useClerk();

  return (
    <header className="w-full bg-base-100 border-b border-base-200 shadow-sm px-6 py-4 flex items-center justify-between">
      <div className="text-lg font-semibold tracking-tight text-primary">AuraCast</div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        {user && (
          <>
            <div className="avatar">
              <div className="w-8 h-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user.imageUrl} alt="User Avatar" />
              </div>
            </div>
            <span className="hidden md:block text-sm max-w-[180px] truncate">
              {user.username || user.emailAddresses[0].emailAddress}
            </span>
            <button
              className="btn btn-ghost btn-circle"
              onClick={() => signOut()}
              title="Sign Out"
            >
              <LogOutIcon className="w-5 h-5" />
            </button>
          </>
        )}
      </div>
    </header>
  );
}
