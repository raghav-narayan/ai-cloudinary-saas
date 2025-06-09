'use client';

import { useUser } from '@clerk/nextjs';
import { Sidebar } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';
import { useState } from 'react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="h-screen w-screen flex bg-base-100 text-base-content overflow-hidden">
      {/* Sidebar Panel */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'} flex-shrink-0 h-full`}>
        <Sidebar isOpen={sidebarOpen} toggleOpen={() => setSidebarOpen(!sidebarOpen)} />
      </div>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Topbar user={user ?? null} />

        <main className="flex-1 overflow-y-auto overflow-x-hidden px-6 py-8">
          <div className="max-w-[1600px] mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
