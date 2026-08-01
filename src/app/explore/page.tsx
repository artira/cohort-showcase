'use client';

import Nav from '@/components/Nav';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getSupabase, getPmSupabase, PM_URL, COMMS_URL } from '@/lib/supabase';

type Student = { id: string; name: string; github_handle: string | null; bio: string | null; skills: string[]; pm_deploy: string | null; comms_deploy: string | null };
type PmProfile = { id: string; display_name: string; points: number };

export default function ExplorePage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [leaderboard, setLeaderboard] = useState<PmProfile[]>([]);
  const [pmStats, setPmStats] = useState({ projects: 0, tasks: 0, done: 0, members: 0, inProgress: 0 });
  const [skillMap, setSkillMap] = useState<Record<string, number>>({});
  const [activeViz, setActiveViz] = useState<'ecosystem' | 'skills' | 'timeline' | 'leaderboard'>('ecosystem');
  const [animatedStats, setAnimatedStats] = useState({ projects: 0, tasks: 0, done: 0, members: 0 });
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  useEffect(() => {
    try {
      getSupabase().from('students').select('*').eq('is_public', true).order('name').then(({ data }) => {
        if (data) {
          setStudents(data);
          const skills: Record<string, number> = {};
          data.forEach((s: Student) => s.skills?.forEach((sk: string) => { skills[sk] = (skills[sk] || 0) + 1; }));
          setSkillMap(skills);
        }
      });
    } catch {}
    try {
      getPmSupabase().from('profiles').select('id, display_name, points').order('points', { ascending: false }).then(({ data }) => { if (data) setLeaderboard(data); });
      (async () => {
        const p = getPmSupabase();
        const { count: projects } = await p.from('projects').select('*', { count: 'exact', head: true });
        const { count: tasks } = await p.from('tasks').select('*', { count: 'exact', head: true });
        const { count: done } = await p.from('tasks').select('*', { count: 'exact', head: true }).eq('status', 'done');
        const { count: inProgress } = await p.from('tasks').select('*', { count: 'exact', head: true }).eq('status', 'in_progress');
        const { count: members } = await p.from('profiles').select('*', { count: 'exact', head: true });
        setPmStats({ projects: projects || 0, tasks: tasks || 0, done: done || 0, members: members || 0, inProgress: inProgress || 0 });
      })();
    } catch {}
  }, []);

  useEffect(() => {
    if (pmStats.tasks === 0) return;
    const steps = 60;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const ease = 1 - Math.pow(1 - Math.min(step / steps, 1), 3);
      setAnimatedStats({ projects: Math.round(pmStats.projects * ease), tasks: Math.round(pmStats.tasks * ease), done: Math.round(pmStats.done * ease), members: Math.round(pmStats.members * ease) });
      if (step >= steps) clearInterval(interval);
    }, 33);
    return () => clearInterval(interval);
  }, [pmStats]);

  const TIMELINE = [
    { week: 1, title: 'PM Platform', desc: 'Kanban board, role-based permissions, points leaderboard', emoji: '📋', color: '#6c5ce7', status: 'shipped' },
    { week: 2, title: 'Comms Platform', desc: 'Real-time chat, DMs, threads, reactions, typing indicators', emoji: '💬', color: '#00b894', status: 'shipped' },
    { week: 3, title: 'Public Showcase', desc: 'Student profiles, PM integration, partner portal', emoji: '🎓', color: '#fd79a8', status: 'shipped' },
    { week: 4, title: 'Phase 1 Unification', desc: 'Cross-platform integration, shared auth, webhooks', emoji: '🔗', color: '#00cec9', status: 'upcoming' },
    { week: 5, title: 'Phase 2 Begins', desc: 'Learning app, open source, venture projects', emoji: '🚀', color: '#f39c12', status: 'upcoming' },
    { week: 8, title: 'End-of-Pilot Showcase', desc: 'Live demos, employer presentations, graduation', emoji: '🏆', color: '#e17055', status: 'upcoming' },
  ];

  const sortedSkills = Object.entries(skillMap).sort((a, b) => b[1] - a[1]);
  const maxSkillCount = Math.max(...Object.values(skillMap), 1);

  return (
    <div style={{ background: 'var(--bg)' }}>
      <Nav />
      <div className="pt-16">
        {/* Hero */}
        <section className="py-16 px-4 text-center" style={{ background: 'var(--gradient-hero)' }}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: '#a29bfe' }}>Live Cohort Data</p>
          <h1 className="text-3xl md:text-5xl font-black mb-4" style={{ color: '#f0f0f5' }}>
            Explore the <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'var(--gradient-accent)' }}>Ecosystem</span>
          </h1>
          <p className="text-sm max-w-lg mx-auto mb-10" style={{ color: 'rgba(255,255,255,0.6)' }}>Real-time data from three interconnected platforms</p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {[
              { value: animatedStats.members, label: 'Developers', icon: '👩‍💻', color: '#6c5ce7' },
              { value: animatedStats.projects, label: 'Projects', icon: '📁', color: '#00b894' },
              { value: animatedStats.tasks, label: 'Tasks Tracked', icon: '📋', color: '#fd79a8' },
              { value: animatedStats.done, label: 'Tasks Shipped', icon: '✅', color: '#55efc4' },
              { value: students.length, label: 'Public Profiles', icon: '🎓', color: '#f39c12' },
              { value: Object.keys(skillMap).length, label: 'Unique Skills', icon: '⚡', color: '#00cec9' },
            ].map(s => (
              <div key={s.label} className="text-center group">
                <div className="text-2xl mb-1 group-hover:scale-125 transition-transform">{s.icon}</div>
                <p className="text-3xl md:text-4xl font-black" style={{ color: s.color }}>{s.value}</p>
                <p className="text-[10px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Viz switcher */}
        <section className="py-8 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-center gap-2 mb-8 flex-wrap">
              {[
                { key: 'ecosystem', label: '🔗 Ecosystem', color: '#6c5ce7' },
                { key: 'skills', label: '⚡ Skills Map', color: '#00b894' },
                { key: 'timeline', label: '📅 Timeline', color: '#fd79a8' },
                { key: 'leaderboard', label: '🏆 Leaderboard', color: '#f39c12' },
              ].map(tab => (
                <button key={tab.key} onClick={() => setActiveViz(tab.key as typeof activeViz)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:scale-105"
                  style={{ background: activeViz === tab.key ? tab.color : 'var(--bg-card)', color: activeViz === tab.key ? 'white' : 'var(--text-secondary)', border: '1px solid', borderColor: activeViz === tab.key ? tab.color : 'var(--border)' }}>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Ecosystem */}
            {activeViz === 'ecosystem' && (
              <div className="animate-fadeUp">
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { emoji: '📋', title: 'PM Platform', desc: `${pmStats.tasks} tasks · ${pmStats.done} shipped`, url: PM_URL, color: '#6c5ce7', grad: 'var(--gradient-accent)', features: ['Kanban Board', 'Points System', 'Role Permissions', 'Leaderboard'] },
                    { emoji: '💬', title: 'Cohort Comms', desc: '6 channels · Real-time', url: COMMS_URL, color: '#00b894', grad: 'linear-gradient(135deg, #00b894, #55efc4)', features: ['Live Chat', 'DMs', 'Threads', 'Reactions'] },
                    { emoji: '🎓', title: 'Showcase', desc: `${students.length} profiles`, url: '#', color: '#fd79a8', grad: 'linear-gradient(135deg, #fd79a8, #fab1a0)', features: ['Profiles', 'Skills Filter', 'Partner Portal', 'Live Stats'] },
                  ].map(p => (
                    <a key={p.title} href={p.url} target={p.url === '#' ? undefined : '_blank'}
                      className="group rounded-2xl border p-6 hover:shadow-xl transition-all hover:-translate-y-2 text-center"
                      style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mx-auto mb-3 group-hover:scale-110 transition-transform shadow-md" style={{ background: p.grad }}>{p.emoji}</div>
                      <h3 className="text-sm font-bold mb-1">{p.title}</h3>
                      <p className="text-[10px] mb-3" style={{ color: p.color }}>{p.desc}</p>
                      <div className="flex flex-wrap justify-center gap-1">
                        {p.features.map(f => <span key={f} className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: p.color + '15', color: p.color }}>{f}</span>)}
                      </div>
                    </a>
                  ))}
                </div>
                <div className="flex flex-wrap justify-center gap-4 mt-6">
                  {[{ from: 'PM', to: 'Showcase', label: 'Live stats & project data', color: '#6c5ce7' }, { from: 'Comms', to: 'Showcase', label: 'Team activity signals', color: '#00b894' }].map(f => (
                    <div key={f.label} className="flex items-center gap-2 text-[10px] px-3 py-1.5 rounded-full" style={{ background: f.color + '15', color: f.color }}>
                      <span className="font-semibold">{f.from}</span><span>→</span><span className="font-semibold">{f.to}</span>
                      <span style={{ color: 'var(--text-muted)' }}>· {f.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {activeViz === 'skills' && (
              <div className="animate-fadeUp">
                <h3 className="text-lg font-bold text-center mb-2">Cohort Skills Map</h3>
                <p className="text-xs text-center mb-6" style={{ color: 'var(--text-muted)' }}>Bubble size = number of developers</p>
                <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto mb-8">
                  {sortedSkills.map(([skill, count], i) => {
                    const size = 40 + (count / maxSkillCount) * 80;
                    const colors = ['#6c5ce7', '#00b894', '#fd79a8', '#00cec9', '#f39c12', '#e17055', '#a29bfe', '#55efc4'];
                    const color = colors[i % colors.length];
                    return (
                      <button key={skill} onMouseEnter={() => setHoveredSkill(skill)} onMouseLeave={() => setHoveredSkill(null)}
                        className="rounded-full flex items-center justify-center font-semibold transition-all hover:scale-110 hover:shadow-lg relative animate-scaleIn"
                        style={{ width: size, height: size, background: `${color}20`, border: `2px solid ${color}`, color, fontSize: size < 60 ? '9px' : '11px', animationDelay: `${i * 0.05}s`, transform: hoveredSkill === skill ? 'scale(1.2)' : 'scale(1)', boxShadow: hoveredSkill === skill ? `0 0 20px ${color}40` : 'none' }}>
                        {skill}
                        {hoveredSkill === skill && (
                          <span className="absolute -top-6 text-[10px] px-2 py-0.5 rounded-full text-white whitespace-nowrap animate-fadeUp" style={{ background: color }}>
                            {count} dev{count > 1 ? 's' : ''}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                {hoveredSkill && (
                  <div className="max-w-2xl mx-auto animate-fadeUp text-center">
                    <p className="text-xs font-semibold mb-3" style={{ color: 'var(--accent)' }}>Developers with {hoveredSkill}</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {students.filter(s => s.skills?.includes(hoveredSkill!)).map(s => (
                        <span key={s.id} className="text-xs px-3 py-1.5 rounded-full border" style={{ borderColor: 'var(--border)' }}>{s.name}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Timeline */}
            {activeViz === 'timeline' && (
              <div className="animate-fadeUp max-w-2xl mx-auto">
                <h3 className="text-lg font-bold text-center mb-6">Cohort Journey</h3>
                <div className="relative">
                  <div className="absolute left-6 top-0 bottom-0 w-0.5" style={{ background: 'var(--border)' }} />
                  {TIMELINE.map((item, i) => (
                    <div key={item.week} className="relative flex gap-4 mb-8 animate-fadeUp" style={{ animationDelay: `${i * 0.1}s` }}>
                      <div className="relative z-10 flex-shrink-0">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-md"
                          style={{ background: item.status === 'shipped' ? item.color : 'var(--bg-card)', border: item.status === 'upcoming' ? `2px dashed ${item.color}` : 'none' }}>
                          {item.emoji}
                        </div>
                      </div>
                      <div className="flex-1 rounded-xl border p-4 hover:shadow-md transition-shadow" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full" style={{ background: item.status === 'shipped' ? item.color + '20' : 'var(--border)', color: item.status === 'shipped' ? item.color : 'var(--text-muted)' }}>Week {item.week}</span>
                          <span className="text-[10px] font-semibold" style={{ color: item.status === 'shipped' ? 'var(--success)' : 'var(--text-muted)' }}>{item.status === 'shipped' ? '✓ Shipped' : 'Upcoming'}</span>
                        </div>
                        <h4 className="text-sm font-bold">{item.title}</h4>
                        <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Leaderboard */}
            {activeViz === 'leaderboard' && (
              <div className="animate-fadeUp max-w-xl mx-auto">
                <h3 className="text-lg font-bold text-center mb-2">PM Leaderboard</h3>
                <p className="text-xs text-center mb-6" style={{ color: 'var(--text-muted)' }}>Live points from the PM platform</p>
                {leaderboard.length >= 3 && (
                  <div className="flex items-end justify-center gap-3 mb-8">
                    {[1, 0, 2].map(idx => {
                      const p = leaderboard[idx];
                      if (!p) return null;
                      const rank = idx === 0 ? 1 : idx === 1 ? 2 : 3;
                      const h = { 1: 'h-28', 2: 'h-20', 3: 'h-16' };
                      const m = { 1: '🥇', 2: '🥈', 3: '🥉' };
                      const g = { 1: 'linear-gradient(135deg,#f9ca24,#f0932b)', 2: 'linear-gradient(135deg,#dfe6e9,#b2bec3)', 3: 'linear-gradient(135deg,#e17055,#fab1a0)' };
                      return (
                        <div key={p.id} className="flex flex-col items-center w-28 animate-fadeUp" style={{ animationDelay: `${rank * 0.15}s` }}>
                          <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2 shadow-lg" style={{ background: g[rank as 1 | 2 | 3] }}>{m[rank as 1 | 2 | 3]}</div>
                          <p className="text-xs font-bold text-center truncate w-full">{p.display_name}</p>
                          <div className={`w-full ${h[rank as 1 | 2 | 3]} rounded-t-xl mt-2 flex flex-col items-center justify-center`} style={{ background: g[rank as 1 | 2 | 3] }}>
                            <p className="text-xl font-black text-white">{p.points}</p>
                            <p className="text-[9px] text-white/70">points</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                <div className="space-y-2">
                  {leaderboard.slice(3).map((p, i) => {
                    const max = leaderboard[0]?.points || 1;
                    return (
                      <div key={p.id} className="flex items-center gap-3 rounded-xl border px-4 py-3 animate-fadeUp" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)', animationDelay: `${(i + 3) * 0.05}s` }}>
                        <span className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: 'var(--border)', color: 'var(--text-muted)' }}>{i + 4}</span>
                        <span className="text-sm font-medium flex-1">{p.display_name}</span>
                        <div className="w-24 h-2 rounded-full" style={{ background: 'var(--border)' }}><div className="h-2 rounded-full" style={{ width: `${(p.points / max) * 100}%`, background: 'var(--accent)' }} /></div>
                        <span className="text-xs font-bold" style={{ color: 'var(--accent)' }}>{p.points}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="text-center mt-6"><a href={PM_URL} target="_blank" className="text-xs hover:underline" style={{ color: 'var(--accent)' }}>View full leaderboard →</a></div>
              </div>
            )}
          </div>
        </section>

        {/* Student spotlight */}
        <section className="py-16 px-4" style={{ background: 'var(--bg-card)' }}>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-2">Meet the Builders</h2>
            <p className="text-xs text-center mb-8" style={{ color: 'var(--text-muted)' }}>Click a profile to learn more</p>
            <div className="flex flex-wrap justify-center gap-4">
              {students.map((s, i) => {
                const colors = ['#6c5ce7', '#00b894', '#fd79a8', '#00cec9', '#f39c12', '#e17055', '#a29bfe', '#55efc4'];
                const color = colors[i % colors.length];
                const isSel = selectedStudent?.id === s.id;
                return (
                  <button key={s.id} onClick={() => setSelectedStudent(isSel ? null : s)}
                    className="flex flex-col items-center gap-2 p-3 rounded-2xl transition-all hover:scale-105 animate-fadeUp"
                    style={{ animationDelay: `${i * 0.05}s`, background: isSel ? color + '15' : 'transparent', border: '2px solid', borderColor: isSel ? color : 'transparent' }}>
                    <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-md" style={{ background: color }}>
                      {s.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-xs font-medium" style={{ color: isSel ? color : 'var(--text-primary)' }}>{s.name.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
            {selectedStudent && (
              <div className="max-w-lg mx-auto mt-8 rounded-2xl border p-6 animate-scaleIn" style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}>
                <h3 className="text-base font-bold">{selectedStudent.name}</h3>
                {selectedStudent.github_handle && <a href={`https://github.com/${selectedStudent.github_handle}`} target="_blank" className="text-xs hover:underline" style={{ color: 'var(--accent)' }}>@{selectedStudent.github_handle}</a>}
                {selectedStudent.bio && <p className="text-xs mt-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{selectedStudent.bio}</p>}
                <div className="flex flex-wrap gap-1 mt-3">
                  {selectedStudent.skills?.map((sk: string) => <span key={sk} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>{sk}</span>)}
                </div>
                <div className="flex gap-2 mt-4">
                  {selectedStudent.pm_deploy && <a href={selectedStudent.pm_deploy} target="_blank" className="text-[10px] px-3 py-1.5 rounded-lg text-white font-semibold" style={{ background: 'var(--gradient-accent)' }}>📋 PM</a>}
                  {selectedStudent.comms_deploy && <a href={selectedStudent.comms_deploy} target="_blank" className="text-[10px] px-3 py-1.5 rounded-lg text-white font-semibold" style={{ background: 'linear-gradient(135deg,#00b894,#55efc4)' }}>💬 Comms</a>}
                  <Link href={`/partners?student=${selectedStudent.id}#contact`} className="text-[10px] px-3 py-1.5 rounded-lg border font-semibold" style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>Request Intro →</Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 text-center" style={{ background: 'var(--gradient-hero)' }}>
          <h2 className="text-2xl font-bold mb-3" style={{ color: '#f0f0f5' }}>Impressed?</h2>
          <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>Browse full profiles, review GitHub, request introductions.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/students" className="px-6 py-3 rounded-xl text-sm font-semibold text-white hover:scale-105 transition-transform" style={{ background: 'var(--gradient-accent)' }}>Full Profiles</Link>
            <Link href="/partners#contact" className="px-6 py-3 rounded-xl text-sm font-semibold text-white hover:scale-105 transition-transform" style={{ background: 'var(--gradient-cta)' }}>Request Intro</Link>
          </div>
        </section>

        <footer className="py-8 px-4 border-t text-center" style={{ borderColor: 'var(--border)' }}>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Hult Cohort Developer Program · Summer 2026</p>
        </footer>
      </div>
    </div>
  );
}
