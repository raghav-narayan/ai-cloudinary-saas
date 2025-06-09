import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboardIcon,
  Share2Icon,
  UploadIcon,
  ImageIcon,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

const navItems = [
  { href: '/home', label: 'Dashboard', icon: LayoutDashboardIcon },
  { href: '/social-share', label: 'Social Share', icon: Share2Icon },
  { href: '/video-upload', label: 'Upload Media', icon: UploadIcon },
];

export function Sidebar({ isOpen, toggleOpen }: { isOpen: boolean; toggleOpen: () => void }) {
  const pathname = usePathname();

  return (
    <aside
      className={`h-screen bg-base-200 border-r border-base-300 shadow-inner flex flex-col transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-16'
      }`}
    >
      <div className="flex items-center justify-between px-4 py-6">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-6 h-6 text-primary" />
          {isOpen && <span className="text-lg font-bold text-primary">AuraCast</span>}
        </div>
        <button onClick={toggleOpen} className="btn btn-xs btn-ghost">
          {isOpen ? <ChevronsLeft size={18} /> : <ChevronsRight size={18} />}
        </button>
      </div>

      <ul className="menu px-2 flex-grow">
        {navItems.map(({ href, label, icon: Icon }) => (
          <li key={href} title={isOpen ? '' : label}>
            <Link
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                pathname === href
                  ? 'bg-primary text-white shadow'
                  : 'hover:bg-base-300'
              }`}
            >
              <Icon className="w-5 h-5" />
              {isOpen && <span>{label}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
