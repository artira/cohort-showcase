import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Hult Cohort Developer Program — Summer 2026',
  description: 'Production-ready developers you can evaluate entirely on GitHub.',
  openGraph: { title: 'Hult Cohort Developer Program — Summer 2026', description: 'Browse profiles, inspect code, request introductions.', type: 'website' },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className="antialiased">{children}</body></html>;
}
