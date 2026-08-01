'use client';
import Nav from '@/components/Nav';
import { useEffect, useState } from 'react';
import { getPmSupabase, PM_URL, COMMS_URL } from '@/lib/supabase';
type Project = { id:string; name:string; description:string|null; target_date:string|null };
export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [stats, setStats] = useState<Record<string,{total:number;done:number;in_progress:number}>>({});
  const [loading, setLoading] = useState(true);
  useEffect(()=>{(async()=>{try{const p=getPmSupabase();const{data:projs}=await p.from('projects').select('*').eq('archived',false).order('created_at');if(projs){setProjects(projs);const{data:tasks}=await p.from('tasks').select('project_id,status');const s:Record<string,{total:number;done:number;in_progress:number}>={};(tasks||[]).forEach(t=>{if(!s[t.project_id])s[t.project_id]={total:0,done:0,in_progress:0};s[t.project_id].total++;if(t.status==='done')s[t.project_id].done++;if(t.status==='in_progress')s[t.project_id].in_progress++;});setStats(s);}}catch{}setLoading(false);})();},[]);
  return(<div style={{background:'var(--bg)'}}><Nav /><div className="pt-20 pb-16 px-4 max-w-5xl mx-auto">
    <div className="text-center mb-10"><h1 className="text-3xl font-bold mb-2">Cohort Projects</h1><p className="text-sm" style={{color:'var(--text-secondary)'}}>Live data from the PM platform</p></div>
    <div className="grid md:grid-cols-2 gap-4 mb-10">
      <a href={PM_URL} target="_blank" className="rounded-2xl p-6 text-white hover:scale-[1.02] transition-transform" style={{background:'var(--gradient-accent)'}}><p className="text-2xl mb-2">📋</p><h3 className="font-bold">PM Platform</h3><p className="text-xs opacity-80">Kanban, tasks, leaderboard</p></a>
      <a href={COMMS_URL} target="_blank" className="rounded-2xl p-6 text-white hover:scale-[1.02] transition-transform" style={{background:'linear-gradient(135deg,#00b894,#55efc4)'}}><p className="text-2xl mb-2">💬</p><h3 className="font-bold">Comms Platform</h3><p className="text-xs opacity-80">Chat, DMs, threads, reactions</p></a>
    </div>
    <h2 className="text-xl font-bold mb-4">Live Project Status</h2>
    {loading?<p className="text-sm animate-pulse text-center py-10" style={{color:'var(--text-muted)'}}>Loading...</p>:projects.length===0?<p className="text-sm text-center py-10" style={{color:'var(--text-muted)'}}>PM data unavailable</p>:
    <div className="space-y-4">{projects.map(p=>{const s=stats[p.id]||{total:0,done:0,in_progress:0};const pct=s.total>0?Math.round((s.done/s.total)*100):0;return(
      <div key={p.id} className="rounded-2xl border p-6 animate-fadeUp" style={{background:'var(--bg-card)',borderColor:'var(--border)'}}>
        <div className="flex items-start justify-between mb-3"><div><h3 className="text-base font-bold">{p.name}</h3>{p.description&&<p className="text-xs mt-1" style={{color:'var(--text-secondary)'}}>{p.description}</p>}</div><span className="text-xs font-semibold px-2 py-1 rounded-full" style={{background:pct===100?'rgba(0,184,148,0.1)':'var(--accent-light)',color:pct===100?'var(--success)':'var(--accent)'}}>{pct}%</span></div>
        <div className="w-full h-2 rounded-full mb-3 overflow-hidden flex" style={{background:'var(--border)'}}><div className="h-2" style={{width:`${s.total>0?(s.done/s.total)*100:0}%`,background:'var(--success)'}}/><div className="h-2" style={{width:`${s.total>0?(s.in_progress/s.total)*100:0}%`,background:'var(--accent)'}}/></div>
        <div className="flex gap-4 text-xs" style={{color:'var(--text-muted)'}}><span>{s.total} tasks</span><span style={{color:'var(--success)'}}>{s.done} done</span><span style={{color:'var(--accent)'}}>{s.in_progress} active</span></div>
      </div>);})}</div>}
  </div></div>);
}
