'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';
import { useEffect, useState } from 'react';
import { pmSupabase, COMMS_URL, PM_URL } from '@/lib/supabase';

export default function HomePage() {
  const [pmStats, setPmStats] = useState({ projects: 0, tasks: 0, done: 0, members: 0 });

  useEffect(() => {
    async function loadPmStats() {
      try {
        const { count: projects } = await pmSupabase.from('projects').select('*', { count: 'exact', head: true });
        const { count: tasks } = await pmSupabase.from('tasks').select('*', { count: 'exact', head: true });
        const { count: done } = await pmSupabase.from('tasks').select('*', { count: 'exact', head: true }).eq('status', 'done');
        const { count: members } = await pmSupabase.from('profiles').select('*', { count: 'exact', head: true });
        setPmStats({ projects: projects || 0, tasks: tasks || 0, done: done || 0, members: members || 0 });
      } catch (e) { console.log('PM stats unavailable'); }
    }
    loadPmStats();
  }, []);

  return (
    <div>
      <Nav transparent />
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-10 blur-3xl animate-float" style={{ background: '#6c5ce7' }} />
          <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full opacity-10 blur-3xl animate-float" style={{ background: '#00b894', animationDelay: '2s' }} />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="animate-fadeUp">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: '#a29bfe' }}>Hult Cohort Developer Program · Summer 2026</p>
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6" style={{ color: '#f0f0f5' }}>
              Don&apos;t trust our word —<br />
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'var(--gradient-accent)' }}>inspect their GitHub.</span>
            </h1>
            <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Every review, every deployment, every merged PR is public. These developers built production platforms — a project management tool, a real-time communications app, and this showcase — in 8 weeks.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fadeUp" style={{ animationDelay: '0.2s' }}>
            <Link href="/students" className="px-6 py-3 rounded-xl text-sm font-semibold text-white hover:scale-105 transition-transform shadow-lg" style={{ background: 'var(--gradient-accent)' }}>Browse Students →</Link>
            <Link href="/partners" className="px-6 py-3 rounded-xl text-sm font-semibold border hover:scale-105 transition-transform" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>Hire From This Cohort</Link>
          </div>
          {pmStats.tasks > 0 && (
            <div className="flex flex-wrap justify-center gap-8 mt-14 animate-fadeUp" style={{ animationDelay: '0.4s' }}>
              {[{ v: pmStats.members, l: 'Developers' }, { v: pmStats.projects, l: 'Projects' }, { v: pmStats.tasks, l: 'Tasks Tracked' }, { v: pmStats.done, l: 'Tasks Shipped' }].map(s => (
                <div key={s.l} className="text-center"><p className="text-3xl font-black" style={{ color: '#f0f0f5' }}>{s.v}</p><p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.l}</p></div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 px-4"><div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">What makes this cohort different</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          <p>The Hult Cohort Developer Program is an 8-week intensive where every line of code, every review, and every deployment is public. There are no private repos, no simulated assignments, no participation trophies. Each week, participants build a production platform, submit it for peer review, and compete to have their submission selected as live cohort infrastructure.</p>
          <p>Week 1: a project management platform. Week 2: a real-time communications tool to replace Discord. Week 3: this public showcase. Each platform is deployed to production over HTTPS, reviewed by 60+ peers, and stress-tested with real users. The winning submission becomes the tool the entire cohort uses.</p>
          <p>What you see here is the result: developers who can ship under pressure, review others&apos; code constructively, and operate production systems collaboratively. Every student&apos;s GitHub profile tells the full story. Don&apos;t trust our word. Inspect their work.</p>
        </div>
      </div></section>

      <section className="py-16 px-4" style={{ background: 'var(--bg-card)' }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-2 text-center">The Cohort Ecosystem</h2>
          <p className="text-sm text-center mb-10" style={{ color: 'var(--text-muted)' }}>Three interconnected platforms, all built by cohort members</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { emoji: '📋', title: 'Project Management', desc: 'Kanban board with role-based permissions, points system, leaderboard, and real-time task tracking.', stats: pmStats.tasks > 0 ? `${pmStats.tasks} tasks · ${pmStats.done} shipped` : undefined, url: PM_URL, grad: 'var(--gradient-accent)' },
              { emoji: '💬', title: 'Cohort Comms', desc: 'Real-time chat with channels, threads, DMs, emoji reactions, typing indicators, and admin-gated announcements.', stats: '6 channels · Real-time', url: COMMS_URL, grad: 'linear-gradient(135deg, #00b894, #55efc4)' },
              { emoji: '🎓', title: 'Public Showcase', desc: "You're looking at it. Student portfolios, GitHub activity, project links, and a partner hiring portal.", stats: 'Live now', url: '#', grad: 'linear-gradient(135deg, #fd79a8, #fab1a0)', current: true },
            ].map(c => (
              <a key={c.title} href={c.url} target={c.current ? undefined : '_blank'} className="group rounded-2xl border p-6 hover:shadow-lg transition-all hover:-translate-y-1" style={{ borderColor: c.current ? 'var(--accent)' : 'var(--border)', background: 'var(--bg)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4" style={{ background: c.grad }}><span className="group-hover:scale-110 transition-transform">{c.emoji}</span></div>
                <h3 className="text-base font-bold mb-2">{c.title}</h3>
                <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>{c.desc}</p>
                {c.stats && <p className="text-[10px] font-semibold" style={{ color: 'var(--accent)' }}>{c.stats}</p>}
                {c.current && <span className="inline-block mt-2 text-[9px] px-2 py-0.5 rounded-full font-semibold" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>You are here</span>}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 text-center" style={{ background: 'var(--gradient-hero)' }}>
        <h2 className="text-3xl font-bold mb-4" style={{ color: '#f0f0f5' }}>Ready to hire from this cohort?</h2>
        <p className="text-sm mb-8 max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>Browse student profiles, review their GitHub contributions, and request introductions. You pay only when you hire.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/students" className="px-6 py-3 rounded-xl text-sm font-semibold text-white hover:scale-105 transition-transform" style={{ background: 'var(--gradient-accent)' }}>Browse Students</Link>
          <Link href="/partners#contact" className="px-6 py-3 rounded-xl text-sm font-semibold text-white hover:scale-105 transition-transform" style={{ background: 'var(--gradient-cta)' }}>Request Intro</Link>
        </div>
      </section>

      <footer className="py-8 px-4 border-t text-center" style={{ borderColor: 'var(--border)' }}>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Hult Cohort Developer Program · Summer Pilot 2026 · Cursor Boston</p>
        <div className="flex justify-center gap-4 mt-2">
          <a href={PM_URL} target="_blank" className="text-xs hover:underline" style={{ color: 'var(--accent)' }}>PM Platform</a>
          <a href={COMMS_URL} target="_blank" className="text-xs hover:underline" style={{ color: 'var(--accent)' }}>Cohort Comms</a>
          <a href="https://github.com/artira" target="_blank" className="text-xs hover:underline" style={{ color: 'var(--accent)' }}>GitHub</a>
        </div>
      </footer>
    </div>
  );
}
