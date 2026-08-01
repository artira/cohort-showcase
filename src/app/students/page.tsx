'use client';
import Nav from '@/components/Nav';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase';
type Student = { id: string; name: string; github_handle: string|null; bio: string|null; campus: string; skills: string[]; is_public: boolean; pm_deploy: string|null; comms_deploy: string|null; linkedin_url: string|null; };
const COLORS: Record<string,string> = {'Next.js':'#6c5ce7','React':'#00cec9','TypeScript':'#3b82f6','Python':'#f39c12','Node.js':'#00b894','Supabase':'#55efc4','PostgreSQL':'#6c5ce7','AWS':'#f39c12','Docker':'#00cec9','Figma':'#fd79a8','Go':'#00b894','default':'#8e90a6'};
export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filter, setFilter] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  useEffect(() => { try { getSupabase().from('students').select('*').eq('is_public',true).order('name').then(({data}) => { if(data){setStudents(data); const s=new Set<string>(); data.forEach(d=>d.skills?.forEach((sk:string)=>s.add(sk))); setSkills(Array.from(s).sort());} }); } catch{} }, []);
  const filtered = filter ? students.filter(s=>s.skills?.includes(filter)) : students;
  return (<div style={{background:'var(--bg)'}}><Nav /><div className="pt-20 pb-16 px-4 max-w-6xl mx-auto">
    <div className="text-center mb-10"><h1 className="text-3xl font-bold mb-2">Meet the Cohort</h1><p className="text-sm" style={{color:'var(--text-secondary)'}}>{students.length} developers · Boston · Summer 2026</p></div>
    <div className="flex flex-wrap justify-center gap-2 mb-10">
      <button onClick={()=>setFilter('')} className="px-3 py-1 rounded-full text-xs font-medium" style={{background:!filter?'var(--accent)':'var(--bg-card)',color:!filter?'white':'var(--text-secondary)',border:'1px solid',borderColor:!filter?'var(--accent)':'var(--border)'}}>All</button>
      {skills.map(sk=><button key={sk} onClick={()=>setFilter(sk===filter?'':sk)} className="px-3 py-1 rounded-full text-xs font-medium" style={{background:filter===sk?'var(--accent)':'var(--bg-card)',color:filter===sk?'white':'var(--text-secondary)',border:'1px solid',borderColor:filter===sk?'var(--accent)':'var(--border)'}}>{sk}</button>)}
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filtered.map((s,i)=>{const c=COLORS[s.skills?.[0]]||'var(--accent)'; return(
        <div key={s.id} className="rounded-2xl border p-6 hover:shadow-lg transition-all hover:-translate-y-1 animate-fadeUp group" style={{background:'var(--bg-card)',borderColor:'var(--border)',animationDelay:`${i*0.05}s`}}>
          <div className="flex items-center gap-3 mb-4"><div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white" style={{background:c}}>{s.name.split(' ').map(n=>n[0]).join('')}</div><div><h3 className="text-sm font-bold">{s.name}</h3><p className="text-xs" style={{color:'var(--text-muted)'}}>{s.campus}</p></div></div>
          {s.bio && <p className="text-xs leading-relaxed mb-4 line-clamp-3" style={{color:'var(--text-secondary)'}}>{s.bio}</p>}
          <div className="flex flex-wrap gap-1 mb-4">{s.skills?.slice(0,5).map(sk=><span key={sk} className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{background:(COLORS[sk]||COLORS.default)+'15',color:COLORS[sk]||COLORS.default}}>{sk}</span>)}</div>
          <div className="flex flex-wrap gap-2 text-[10px]">
            {s.github_handle && <a href={`https://github.com/${s.github_handle}`} target="_blank" className="px-2 py-1 rounded-lg border hover:opacity-80" style={{borderColor:'var(--border)',color:'var(--text-secondary)'}}>GitHub</a>}
            {s.pm_deploy && <a href={s.pm_deploy} target="_blank" className="px-2 py-1 rounded-lg border hover:opacity-80" style={{borderColor:'var(--border)',color:'var(--text-secondary)'}}>📋 PM</a>}
            {s.comms_deploy && <a href={s.comms_deploy} target="_blank" className="px-2 py-1 rounded-lg border hover:opacity-80" style={{borderColor:'var(--border)',color:'var(--text-secondary)'}}>💬 Comms</a>}
          </div>
          <Link href={`/partners?student=${s.id}#contact`} className="block mt-4 text-center py-2 rounded-xl text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity" style={{background:'var(--gradient-accent)'}}>Request Intro →</Link>
        </div>
      );})}
    </div>
  </div></div>);
}
