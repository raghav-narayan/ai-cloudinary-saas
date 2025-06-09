'use client';
import { UserResource } from '@clerk/types';
import ThemeToggle from './ThemeToggle';
import { LogOutIcon } from 'lucide-react';
import { useClerk } from '@clerk/nextjs';

interface TopbarProps {
  user: UserResource | null;
  pageTitle: string;
}

export function Topbar({ user, pageTitle }: TopbarProps) {
  const { signOut } = useClerk();

  return (
    <header className="w-full bg-base-100 border-b border-base-200 px-6 py-4 flex items-center justify-between shadow-sm">
      {/* Left: Dynamic page title */}
      <div className="text-lg font-semibold tracking-tight text-base-content">
        {pageTitle}
      </div>

      {/* Right: Theme + Profile + Logout */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
        {user && (
          <>
            {/* Avatar with tooltip */}
            <div className="avatar tooltip" data-tip="View Profile">
              <div className="w-8 h-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user.imageUrl} alt="User Avatar" />
              </div>
            </div>

            {/* Username or email (truncated on small screens) */}
            <span className="hidden md:block text-sm max-w-[180px] truncate">
              {user.username || user.emailAddresses[0].emailAddress}
            </span>

            {/* Divider */}
            <div className="w-px h-6 bg-base-300 mx-1" />

            {/* Sign out */}
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
