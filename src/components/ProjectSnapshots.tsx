'use client';

const PROJECT_SNAPSHOTS = [
  {
    title: 'PM Platform',
    emoji: '📋',
    screenshot: 'pm',
    description: 'Kanban board with drag-and-drop, role-based permissions, points leaderboard, dark mode',
    features: ['Kanban Board', 'Points System', 'Role Permissions', 'Charts'],
    gradient: 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
    darkBg: '#0a0a1a',
    repo: 'https://github.com/artira/pm-artira',
    deploy: 'https://pm-artira-azure.vercel.app',
    tech: ['Next.js', 'Supabase', 'Tailwind'],
  },
  {
    title: 'Cohort Comms',
    emoji: '💬',
    screenshot: 'comms',
    description: 'Real-time chat with channels, DMs, threads, emoji reactions, typing indicators, confetti',
    features: ['Real-time Chat', 'DMs', 'Threads', 'Reactions', 'Confetti'],
    gradient: 'linear-gradient(135deg, #00b894, #55efc4)',
    darkBg: '#0f0f1a',
    repo: 'https://github.com/artira/cohort-comms',
    deploy: 'https://cohort-comms-rho.vercel.app',
    tech: ['Next.js', 'Supabase Realtime', 'Tailwind'],
  },
  {
    title: 'Public Showcase',
    emoji: '🎓',
    screenshot: 'showcase',
    description: 'Student profiles, skills filter, PM data integration, partner portal, interactive explorer',
    features: ['Student Profiles', 'Skills Map', 'PM Integration', 'Partner Portal'],
    gradient: 'linear-gradient(135deg, #fd79a8, #fab1a0)',
    darkBg: '#fafafa',
    repo: 'https://github.com/artira/cohort-showcase',
    deploy: 'https://cohort-showcase-pearl.vercel.app',
    tech: ['Next.js', 'Supabase', 'Tailwind'],
  },
];

function MockScreenshot({ type, gradient }: { type: string; gradient: string }) {
  if (type === 'pm') {
    return (
      <svg viewBox="0 0 400 240" className="w-full h-full">
        <rect width="400" height="240" fill="#0a0a1a" />
        {/* Hero bar */}
        <rect x="0" y="0" width="400" height="50" rx="0" fill="url(#pmGrad)" />
        <text x="20" y="32" fill="white" fontSize="14" fontWeight="bold">📋 Cohort PM</text>
        <text x="300" y="32" fill="rgba(255,255,255,0.7)" fontSize="10">Dashboard</text>
        {/* Stat cards */}
        {[0,1,2,3].map(i => (
          <g key={i}>
            <rect x={20 + i * 92} y="65" width="80" height="45" rx="8" fill={['#6c5ce720','#00b89420','#fd79a820','#00cec920'][i]} stroke={['#6c5ce7','#00b894','#fd79a8','#00cec9'][i]} strokeWidth="1" />
            <text x={60 + i * 92} y="85" fill={['#6c5ce7','#00b894','#fd79a8','#00cec9'][i]} fontSize="16" fontWeight="bold" textAnchor="middle">{[12,8,3,1][i]}</text>
            <text x={60 + i * 92} y="100" fill="rgba(255,255,255,0.4)" fontSize="7" textAnchor="middle">{['Tasks','Done','Active','Overdue'][i]}</text>
          </g>
        ))}
        {/* Kanban columns */}
        {[0,1,2].map(i => (
          <g key={i}>
            <rect x={20 + i * 125} y="125" width="115" height="105" rx="8" fill="#141428" stroke="#252545" strokeWidth="1" />
            <text x={77 + i * 125} y="142" fill={['#8e90a6','#6c5ce7','#00b894'][i]} fontSize="8" textAnchor="middle" fontWeight="bold">{['TO DO','IN PROGRESS','DONE'][i]}</text>
            {[0,1].map(j => (
              <rect key={j} x={28 + i * 125} y={150 + j * 32} width="99" height="26" rx="4" fill="#1a1a2e" stroke="#252545" strokeWidth="0.5" />
            ))}
          </g>
        ))}
        <defs><linearGradient id="pmGrad" x1="0" y1="0" x2="400" y2="0"><stop offset="0%" stopColor="#6c5ce7" /><stop offset="100%" stopColor="#a29bfe" /></linearGradient></defs>
      </svg>
    );
  }

  if (type === 'comms') {
    return (
      <svg viewBox="0 0 400 240" className="w-full h-full">
        <rect width="400" height="240" fill="#0f0f1a" />
        {/* Sidebar */}
        <rect x="0" y="0" width="100" height="240" fill="#12122a" />
        <text x="12" y="22" fill="white" fontSize="10" fontWeight="bold">💬 Comms</text>
        {['🏠 general','📢 announce','🎲 random','🙋 help','🚀 shipped'].map((ch, i) => (
          <g key={i}>
            <rect x="8" y={35 + i * 24} width="84" height="18" rx="4" fill={i === 0 ? '#1e1e3a' : 'transparent'} />
            <text x="14" y={47 + i * 24} fill={i === 0 ? '#a29bfe' : '#6a6a8e'} fontSize="7">{ch}</text>
          </g>
        ))}
        {/* Messages */}
        {[0,1,2].map(i => (
          <g key={i}>
            <circle cx={120} cy={45 + i * 55} r="12" fill={['#6c5ce7','#00b894','#fd79a8'][i]} />
            <text x={120} y={49 + i * 55} fill="white" fontSize="9" textAnchor="middle" fontWeight="bold">{['A','P','M'][i]}</text>
            <rect x={140} y={35 + i * 55} width={180 - i * 30} height="8" rx="2" fill="rgba(255,255,255,0.15)" />
            <rect x={140} y={48 + i * 55} width={120 - i * 20} height="6" rx="2" fill="rgba(255,255,255,0.08)" />
            {/* Reactions */}
            {i === 0 && <><rect x="140" y="60" width="24" height="12" rx="6" fill="#6c5ce720" stroke="#6c5ce7" strokeWidth="0.5" /><text x="152" y="69" fill="#6c5ce7" fontSize="7" textAnchor="middle">🚀 3</text></>}
          </g>
        ))}
        {/* Input */}
        <rect x="108" y="210" width="280" height="22" rx="8" fill="#1e1e3a" stroke="#252545" strokeWidth="1" />
        <text x="120" y="224" fill="#6a6a8e" fontSize="8">Message #general...</text>
      </svg>
    );
  }

  // Showcase
  return (
    <svg viewBox="0 0 400 240" className="w-full h-full">
      <rect width="400" height="240" fill="#fafafa" />
      {/* Hero */}
      <rect x="0" y="0" width="400" height="100" fill="url(#showGrad)" />
      <text x="200" y="35" fill="rgba(255,255,255,0.6)" fontSize="8" textAnchor="middle">HULT COHORT · SUMMER 2026</text>
      <text x="200" y="55" fill="white" fontSize="14" fontWeight="bold" textAnchor="middle">Inspect their GitHub.</text>
      {/* Stats */}
      {[0,1,2,3].map(i => (
        <g key={i}>
          <text x={80 + i * 80} y="82" fill="white" fontSize="14" fontWeight="bold" textAnchor="middle">{[10,3,30,22][i]}</text>
          <text x={80 + i * 80} y="92" fill="rgba(255,255,255,0.5)" fontSize="6" textAnchor="middle">{['Devs','Projects','Tasks','Shipped'][i]}</text>
        </g>
      ))}
      {/* Student cards */}
      {[0,1,2].map(i => (
        <g key={i}>
          <rect x={20 + i * 128} y="115" width="118" height="110" rx="8" fill="white" stroke="#e8e8ec" strokeWidth="1" />
          <circle cx={79 + i * 128} cy="140" r="14" fill={['#6c5ce7','#00b894','#fd79a8'][i]} />
          <text x={79 + i * 128} y="145" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">{['AR','AC','PS'][i]}</text>
          <rect x={40 + i * 128} y="162" width="78" height="6" rx="2" fill="#e8e8ec" />
          <rect x={50 + i * 128} y="174" width="58" height="4" rx="2" fill="#f0edff" />
          {/* Skill pills */}
          {[0,1].map(j => <rect key={j} x={35 + i * 128 + j * 42} y="186" width="36" height="12" rx="6" fill="#f0edff" />)}
        </g>
      ))}
      <defs><linearGradient id="showGrad" x1="0" y1="0" x2="400" y2="100"><stop offset="0%" stopColor="#0a0a1a" /><stop offset="50%" stopColor="#1a1a3e" /><stop offset="100%" stopColor="#2a1a4e" /></linearGradient></defs>
    </svg>
  );
}

export default function ProjectSnapshots() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {PROJECT_SNAPSHOTS.map((p, i) => (
        <div key={p.title} className="group rounded-2xl border overflow-hidden hover:shadow-xl transition-all hover:-translate-y-2 animate-fadeUp"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border)', animationDelay: `${i * 0.1}s` }}>
          {/* Screenshot preview */}
          <a href={p.deploy} target="_blank" className="block relative overflow-hidden cursor-pointer">
            <div className="aspect-[5/3] relative">
              <MockScreenshot type={p.screenshot} gradient={p.gradient} />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <span className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity px-4 py-2 rounded-xl" style={{ background: 'rgba(0,0,0,0.6)' }}>
                  View Live →
                </span>
              </div>
            </div>
            {/* Live badge */}
            <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-[9px] font-semibold text-white" style={{ background: 'rgba(0,0,0,0.5)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              LIVE
            </div>
          </a>

          {/* Info */}
          <div className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{p.emoji}</span>
              <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{p.title}</h3>
            </div>
            <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>{p.description}</p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-1 mb-3">
              {p.tech.map(t => (
                <span key={t} className="text-[9px] px-1.5 py-0.5 rounded-full font-medium" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>{t}</span>
              ))}
            </div>

            {/* Feature tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {p.features.map(f => (
                <span key={f} className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: 'var(--border)', color: 'var(--text-muted)' }}>{f}</span>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <a href={p.deploy} target="_blank"
                className="flex-1 text-center py-2 rounded-xl text-xs font-semibold text-white hover:scale-105 transition-transform"
                style={{ background: p.gradient }}>
                Live Demo
              </a>
              <a href={p.repo} target="_blank"
                className="flex-1 text-center py-2 rounded-xl text-xs font-semibold border hover:scale-105 transition-transform flex items-center justify-center gap-1"
                style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                GitHub
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
