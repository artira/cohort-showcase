'use client';

import Nav from '@/components/Nav';
import { useEffect, useState } from 'react';
import { getPmSupabase, PM_URL, COMMS_URL } from '@/lib/supabase';

type Project = { id: string; name: string; description: string | null; target_date: string | null };

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [taskStats, setTaskStats] = useState<Record<string, { total: number; done: number; in_progress: number }>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const { data: projs } = await getPmSupabase().from('projects').select('*').eq('archived', false).order('created_at');
        if (projs) {
          setProjects(projs);
          const { data: tasks } = await getPmSupabase().from('tasks').select('project_id, status');
          const stats: Record<string, { total: number; done: number; in_progress: number }> = {};
          (tasks || []).forEach(t => {
            if (!stats[t.project_id]) stats[t.project_id] = { total: 0, done: 0, in_progress: 0 };
            stats[t.project_id].total++;
            if (t.status === 'done') stats[t.project_id].done++;
            if (t.status === 'in_progress') stats[t.project_id].in_progress++;
          });
          setTaskStats(stats);
        }
      } catch (e) { console.log('PM data unavailable'); }
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div style={{ background: 'var(--bg)' }}>
      <Nav />
      <div className="pt-20 pb-16 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Cohort Projects</h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Live data from the PM platform — updated in real time</p>
        </div>

        {/* Platform links */}
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          <a href={PM_URL} target="_blank" className="rounded-2xl p-6 text-white hover:scale-[1.02] transition-transform" style={{ background: 'var(--gradient-accent)' }}>
            <p className="text-2xl mb-2">📋</p>
            <h3 className="font-bold text-base mb-1">Project Management Platform</h3>
            <p className="text-xs opacity-80">Kanban board, task tracking, leaderboard, role-based permissions</p>
            <p className="text-xs mt-2 opacity-60">{PM_URL}</p>
          </a>
          <a href={COMMS_URL} target="_blank" className="rounded-2xl p-6 text-white hover:scale-[1.02] transition-transform" style={{ background: 'linear-gradient(135deg, #00b894, #55efc4)' }}>
            <p className="text-2xl mb-2">💬</p>
            <h3 className="font-bold text-base mb-1">Communications Platform</h3>
            <p className="text-xs opacity-80">Real-time chat, threads, DMs, reactions, typing indicators</p>
            <p className="text-xs mt-2 opacity-60">{COMMS_URL}</p>
          </a>
        </div>

        {/* Live project data from PM */}
        <h2 className="text-xl font-bold mb-4">Live Project Status</h2>
        {loading ? (
          <div className="text-center py-10"><p className="text-sm animate-pulse" style={{ color: 'var(--text-muted)' }}>Loading from PM platform...</p></div>
        ) : projects.length === 0 ? (
          <div className="rounded-2xl border p-8 text-center" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>PM platform data unavailable — projects are tracked at <a href={PM_URL} className="underline" style={{ color: 'var(--accent)' }}>{PM_URL}</a></p>
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map(p => {
              const stats = taskStats[p.id] || { total: 0, done: 0, in_progress: 0 };
              const pct = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;
              return (
                <div key={p.id} className="rounded-2xl border p-6 animate-fadeUp" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-base font-bold">{p.name}</h3>
                      {p.description && <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>{p.description}</p>}
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ background: pct === 100 ? 'rgba(0,184,148,0.1)' : 'var(--accent-light)', color: pct === 100 ? 'var(--success)' : 'var(--accent)' }}>
                      {pct}% complete
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2 rounded-full mb-3 overflow-hidden flex" style={{ background: 'var(--border)' }}>
                    <div className="h-2 transition-all" style={{ width: `${stats.total > 0 ? (stats.done / stats.total) * 100 : 0}%`, background: 'var(--success)' }} />
                    <div className="h-2 transition-all" style={{ width: `${stats.total > 0 ? (stats.in_progress / stats.total) * 100 : 0}%`, background: 'var(--accent)' }} />
                  </div>

                  <div className="flex gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
                    <span>{stats.total} tasks</span>
                    <span style={{ color: 'var(--success)' }}>{stats.done} done</span>
                    <span style={{ color: 'var(--accent)' }}>{stats.in_progress} in progress</span>
                    <span>{stats.total - stats.done - stats.in_progress} to do</span>
                    {p.target_date && <span className="ml-auto">Target: {p.target_date}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
