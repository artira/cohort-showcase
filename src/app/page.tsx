'use client';
import Link from 'next/link';
import Nav from '@/components/Nav';
import ParticleNetwork from '@/components/ParticleNetwork';
import ProjectSnapshots from '@/components/ProjectSnapshots';
import { useEffect, useState } from 'react';
import { getPmSupabase, COMMS_URL, PM_URL } from '@/lib/supabase';
export default function HomePage() {
  const [s, setS] = useState({ projects: 0, tasks: 0, done: 0, members: 0 });
  useEffect(() => { (async () => { try { const p = getPmSupabase(); const { count: projects } = await p.from('projects').select('*',{count:'exact',head:true}); const { count: tasks } = await p.from('tasks').select('*',{count:'exact',head:true}); const { count: done } = await p.from('tasks').select('*',{count:'exact',head:true}).eq('status','done'); const { count: members } = await p.from('profiles').select('*',{count:'exact',head:true}); setS({projects:projects||0,tasks:tasks||0,done:done||0,members:members||0}); } catch{} })(); }, []);
  return (<div><Nav transparent />
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden" style={{background:'var(--gradient-hero)'}}>
      <ParticleNetwork color="#6c5ce7" count={50} />
      <div className="absolute inset-0 overflow-hidden pointer-events-none"><div className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-10 blur-3xl animate-float" style={{background:'#6c5ce7'}}/><div className="absolute bottom-20 right-10 w-80 h-80 rounded-full opacity-10 blur-3xl animate-float" style={{background:'#00b894',animationDelay:'2s'}}/></div>
      <div className="relative max-w-4xl mx-auto text-center">
        <div className="animate-fadeUp">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{color:'#a29bfe'}}>Hult Cohort Developer Program · Summer 2026</p>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6" style={{color:'#f0f0f5'}}>Don&apos;t trust our word —<br/><span className="bg-clip-text text-transparent" style={{backgroundImage:'var(--gradient-accent)'}}>inspect their GitHub.</span></h1>
          <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8" style={{color:'rgba(255,255,255,0.7)'}}>Every review, every deployment, every merged PR is public. These developers built production platforms in 8 weeks.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fadeUp" style={{animationDelay:'0.2s'}}>
          <Link href="/explore" className="px-6 py-3 rounded-xl text-sm font-semibold text-white hover:scale-105 transition-transform shadow-lg" style={{background:'var(--gradient-accent)'}}>Explore the Ecosystem →</Link>
          <Link href="/partners" className="px-6 py-3 rounded-xl text-sm font-semibold border hover:scale-105 transition-transform" style={{color:'white',borderColor:'rgba(255,255,255,0.3)'}}>Hire From This Cohort</Link>
        </div>
        {s.tasks > 0 && <div className="flex flex-wrap justify-center gap-8 mt-14 animate-fadeUp" style={{animationDelay:'0.4s'}}>{[{v:s.members,l:'Developers'},{v:s.projects,l:'Projects'},{v:s.tasks,l:'Tasks Tracked'},{v:s.done,l:'Tasks Shipped'}].map(x=><div key={x.l} className="text-center"><p className="text-3xl font-black" style={{color:'#f0f0f5'}}>{x.v}</p><p className="text-xs mt-1" style={{color:'rgba(255,255,255,0.5)'}}>{x.l}</p></div>)}</div>}
      </div>
    </section>
    <section className="py-20 px-4"><div className="max-w-3xl mx-auto"><h2 className="text-2xl font-bold mb-6 text-center">What makes this cohort different</h2><div className="space-y-4 text-sm leading-relaxed" style={{color:'var(--text-secondary)'}}><p>The Hult Cohort Developer Program is an 8-week intensive where every line of code is public. Each week, participants build a production platform, submit for peer review, and compete. The winning submission becomes live cohort infrastructure.</p><p>Week 1: project management. Week 2: real-time communications. Week 3: this public showcase. Each deployed to production, reviewed by 60+ peers, and stress-tested with real users.</p><p>What you see: developers who ship under pressure, review code constructively, and operate production systems collaboratively. Every GitHub profile tells the full story.</p></div></div></section>
    <section className="py-16 px-4" style={{background:'var(--bg-card)'}}><div className="max-w-5xl mx-auto"><h2 className="text-2xl font-bold mb-2 text-center">The Cohort Ecosystem</h2><p className="text-sm text-center mb-10" style={{color:'var(--text-muted)'}}>Three interconnected platforms — click to explore live demos or view source on GitHub</p><ProjectSnapshots /></div></section>
    <section className="py-20 px-4 text-center" style={{background:'var(--gradient-hero)'}}><h2 className="text-3xl font-bold mb-4" style={{color:'#f0f0f5'}}>Ready to hire?</h2><p className="text-sm mb-8" style={{color:'rgba(255,255,255,0.7)'}}>Browse profiles, review GitHub, request intros.</p><div className="flex flex-col sm:flex-row gap-3 justify-center"><Link href="/students" className="px-6 py-3 rounded-xl text-sm font-semibold text-white hover:scale-105 transition-transform" style={{background:'var(--gradient-accent)'}}>Browse Students</Link><Link href="/partners#contact" className="px-6 py-3 rounded-xl text-sm font-semibold text-white hover:scale-105 transition-transform" style={{background:'var(--gradient-cta)'}}>Request Intro</Link></div></section>
    <footer className="py-8 px-4 border-t text-center" style={{borderColor:'var(--border)'}}><p className="text-xs" style={{color:'var(--text-muted)'}}>Hult Cohort Developer Program · Summer 2026</p></footer>
  </div>);
}
