import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hult Cohort Developer Program — Summer 2026',
  description: 'Don\'t trust our word — inspect their GitHub. Every review, deployment, and merged PR is public. Meet the developers building production software in 8 weeks.',
  openGraph: {
    title: 'Hult Cohort Developer Program — Summer 2026',
    description: 'Production-ready developers you can evaluate entirely on GitHub. Browse profiles, inspect code, request introductions.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
