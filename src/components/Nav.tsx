'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
const NAV = [{ href: '/', label: 'Home' },{ href: '/explore', label: 'Explore' },{ href: '/students', label: 'Students' },{ href: '/projects', label: 'Projects' },{ href: '/partners', label: 'For Partners' }];
export default function Nav({ transparent = false }: { transparent?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors ${transparent ? '' : 'border-b shadow-sm'}`} style={{ background: transparent ? 'transparent' : 'var(--bg-card)', borderColor: 'var(--border)' }}>
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-sm flex items-center gap-2" style={{ color: transparent ? 'white' : 'var(--text-primary)' }}>
          <span className="text-lg">🎓</span> Hult Cohort
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {NAV.map(n => <Link key={n.href} href={n.href} className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors" style={{ color: pathname === n.href ? (transparent ? 'white' : 'var(--accent)') : (transparent ? 'rgba(255,255,255,0.7)' : 'var(--text-secondary)'), background: pathname === n.href ? (transparent ? 'rgba(255,255,255,0.1)' : 'var(--accent-light)') : 'transparent' }}>{n.label}</Link>)}
          <Link href="/partners#contact" className="ml-2 px-4 py-1.5 rounded-lg text-sm font-semibold text-white hover:scale-105 transition-transform" style={{ background: 'var(--gradient-accent)' }}>Request Intro</Link>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden p-2" style={{ color: transparent ? 'white' : 'var(--text-primary)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </div>
      {open && <div className="md:hidden border-t px-4 py-2" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>{NAV.map(n => <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="block px-3 py-2 rounded-lg text-sm" style={{ color: 'var(--text-primary)' }}>{n.label}</Link>)}</div>}
    </nav>
  );
}
