'use client';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'auracastlight' | 'auracastdark'>('auracastdark');

  useEffect(() => {
    const stored = localStorage.getItem('theme') as 'auracastlight' | 'auracastdark' | null;
    const initial = stored || 'auracastdark';
    document.documentElement.setAttribute('data-theme', initial);
    setTheme(initial);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'auracastlight' ? 'auracastdark' : 'auracastlight';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <button
      className="btn btn-ghost btn-circle"
      onClick={toggleTheme}
      title="Toggle theme"
    >
      {theme === 'auracastlight' ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}
