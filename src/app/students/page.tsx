'use client';

import Nav from '@/components/Nav';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getSupabase, PM_URL, COMMS_URL } from '@/lib/supabase';

type Student = { id: string; name: string; github_handle: string | null; photo_url: string | null; bio: string | null; campus: string; skills: string[]; is_public: boolean; pm_repo: string | null; pm_deploy: string | null; comms_repo: string | null; comms_deploy: string | null; showcase_repo: string | null; showcase_deploy: string | null; linkedin_url: string | null; portfolio_url: string | null; };

const SKILL_COLORS: Record<string, string> = { 'Next.js': '#6c5ce7', 'React': '#00cec9', 'TypeScript': '#3b82f6', 'Python': '#f39c12', 'Node.js': '#00b894', 'Supabase': '#55efc4', 'PostgreSQL': '#6c5ce7', 'AWS': '#f39c12', 'Docker': '#00cec9', 'Figma': '#fd79a8', 'UX Research': '#a29bfe', 'Go': '#00b894', 'Vue.js': '#55efc4', 'GraphQL': '#fd79a8', 'Swift': '#ff6b6b', default: '#8e90a6' };

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filter, setFilter] = useState('');
  const [allSkills, setAllSkills] = useState<string[]>([]);

  useEffect(() => {
    getSupabase().from('students').select('*').eq('is_public', true).order('name').then(({ data }) => {
      if (data) {
        setStudents(data);
        const skills = new Set<string>();
        data.forEach(s => s.skills?.forEach((sk: string) => skills.add(sk)));
        setAllSkills(Array.from(skills).sort());
      }
    });
  }, []);

  const filtered = filter ? students.filter(s => s.skills?.includes(filter)) : students;

  return (
    <div style={{ background: 'var(--bg)' }}>
      <Nav />
      <div className="pt-20 pb-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Meet the Cohort</h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{students.length} developers · Boston · Summer 2026</p>
        </div>

        {/* Skill filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button onClick={() => setFilter('')} className="px-3 py-1 rounded-full text-xs font-medium transition-colors"
            style={{ background: !filter ? 'var(--accent)' : 'var(--bg-card)', color: !filter ? 'white' : 'var(--text-secondary)', border: '1px solid', borderColor: !filter ? 'var(--accent)' : 'var(--border)' }}>
            All
          </button>
          {allSkills.map(sk => (
            <button key={sk} onClick={() => setFilter(sk === filter ? '' : sk)} className="px-3 py-1 rounded-full text-xs font-medium transition-colors"
              style={{ background: filter === sk ? 'var(--accent)' : 'var(--bg-card)', color: filter === sk ? 'white' : 'var(--text-secondary)', border: '1px solid', borderColor: filter === sk ? 'var(--accent)' : 'var(--border)' }}>
              {sk}
            </button>
          ))}
        </div>

        {/* Student grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((s, i) => (
            <div key={s.id} className="rounded-2xl border p-6 hover:shadow-lg transition-all hover:-translate-y-1 animate-fadeUp group"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border)', animationDelay: `${i * 0.05}s` }}>
              {/* Avatar */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white"
                  style={{ background: SKILL_COLORS[s.skills?.[0]] || 'var(--accent)' }}>
                  {s.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{s.name}</h3>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.campus}</p>
                </div>
              </div>

              {/* Bio */}
              {s.bio && <p className="text-xs leading-relaxed mb-4 line-clamp-3" style={{ color: 'var(--text-secondary)' }}>{s.bio}</p>}

              {/* Skills */}
              <div className="flex flex-wrap gap-1 mb-4">
                {s.skills?.slice(0, 5).map(sk => (
                  <span key={sk} className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                    style={{ background: (SKILL_COLORS[sk] || SKILL_COLORS.default) + '15', color: SKILL_COLORS[sk] || SKILL_COLORS.default }}>
                    {sk}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-2 text-[10px]">
                {s.github_handle && (
                  <a href={`https://github.com/${s.github_handle}`} target="_blank" className="flex items-center gap-1 px-2 py-1 rounded-lg border hover:opacity-80"
                    style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    GitHub
                  </a>
                )}
                {s.pm_deploy && <a href={s.pm_deploy} target="_blank" className="flex items-center gap-1 px-2 py-1 rounded-lg border hover:opacity-80" style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>📋 PM</a>}
                {s.comms_deploy && <a href={s.comms_deploy} target="_blank" className="flex items-center gap-1 px-2 py-1 rounded-lg border hover:opacity-80" style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>💬 Comms</a>}
                {s.linkedin_url && <a href={s.linkedin_url} target="_blank" className="flex items-center gap-1 px-2 py-1 rounded-lg border hover:opacity-80" style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>LinkedIn</a>}
              </div>

              {/* Request intro */}
              <Link href={`/partners?student=${s.id}#contact`}
                className="block mt-4 text-center py-2 rounded-xl text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity hover:scale-105"
                style={{ background: 'var(--gradient-accent)' }}>
                Request Intro →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
