'use client';
import Nav from '@/components/Nav';
import { useState, useEffect } from 'react';
import { getSupabase } from '@/lib/supabase';
export default function PartnersPage() {
  const [form, setForm] = useState({partner_name:'',company:'',email:'',message:''});
  const [students, setStudents] = useState<{id:string;name:string}[]>([]);
  const [sel, setSel] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [rsvp, setRsvp] = useState({name:'',email:'',company:'',role:''});
  const [rsvpDone, setRsvpDone] = useState(false);
  useEffect(()=>{ try{getSupabase().from('students').select('id,name').eq('is_public',true).order('name').then(({data})=>{if(data)setStudents(data);})}catch{} },[]);
  async function submit(e:React.FormEvent){e.preventDefault(); if(!form.partner_name||!form.company||!form.email||!sel.length)return; await getSupabase().from('intro_requests').insert({...form,student_ids:sel}); setDone(true);}
  async function submitRsvp(e:React.FormEvent){e.preventDefault(); if(!rsvp.name||!rsvp.email)return; await getSupabase().from('event_rsvps').insert(rsvp); setRsvpDone(true);}
  return(<div style={{background:'var(--bg)'}}><Nav /><div className="pt-20 pb-16 px-4 max-w-4xl mx-auto">
    <div className="text-center mb-16"><h1 className="text-3xl font-bold mb-3">Hire From This Cohort</h1><p className="text-sm max-w-xl mx-auto" style={{color:'var(--text-secondary)'}}>Production-ready developers you can evaluate entirely on GitHub. Pay only when you hire.</p></div>
    <div className="grid md:grid-cols-3 gap-6 mb-16">{[{s:'1',t:'Browse & Evaluate',d:'Review GitHub, deployed projects, peer reviews.',e:'🔍'},{s:'2',t:'Request Intro',d:'Submit for specific students. Connected in 48h.',e:'🤝'},{s:'3',t:'Hire & Pay',d:'25% first-year base. 90-day clawback. 10% to candidate.',e:'✅'}].map(x=><div key={x.s} className="rounded-2xl border p-6 text-center" style={{background:'var(--bg-card)',borderColor:'var(--border)'}}><div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mx-auto mb-3" style={{background:'var(--accent-light)'}}>{x.e}</div><p className="text-[10px] font-semibold uppercase mb-1" style={{color:'var(--accent)'}}>Step {x.s}</p><h3 className="text-sm font-bold mb-2">{x.t}</h3><p className="text-xs" style={{color:'var(--text-secondary)'}}>{x.d}</p></div>)}</div>
    <div className="rounded-2xl p-8 mb-16 text-center text-white" style={{background:'var(--gradient-hero)'}}><h2 className="text-xl font-bold mb-4">Fee Model</h2><div className="grid md:grid-cols-3 gap-6"><div><p className="text-3xl font-black">25%</p><p className="text-xs mt-1 opacity-70">first-year base</p></div><div><p className="text-3xl font-black">90 days</p><p className="text-xs mt-1 opacity-70">clawback</p></div><div><p className="text-3xl font-black">10%</p><p className="text-xs mt-1 opacity-70">kickback to candidate</p></div></div></div>
    <div id="contact" className="rounded-2xl border p-8 mb-16" style={{background:'var(--bg-card)',borderColor:'var(--border)'}}><h2 className="text-xl font-bold mb-2 text-center">Request an Introduction</h2>
      {done?<div className="text-center py-8 animate-scaleIn"><p className="text-4xl mb-3">🎉</p><p className="text-base font-bold">Request received!</p><p className="text-xs" style={{color:'var(--text-secondary)'}}>We&apos;ll connect you within 48 hours.</p></div>:
      <form onSubmit={submit} className="space-y-4 max-w-lg mx-auto">
        <div className="grid grid-cols-2 gap-3"><div><label className="block text-xs mb-1" style={{color:'var(--text-muted)'}}>Your name *</label><input type="text" required value={form.partner_name} onChange={e=>setForm({...form,partner_name:e.target.value})} className="w-full px-3 py-2 rounded-xl border text-sm outline-none" style={{borderColor:'var(--border)'}}/></div><div><label className="block text-xs mb-1" style={{color:'var(--text-muted)'}}>Company *</label><input type="text" required value={form.company} onChange={e=>setForm({...form,company:e.target.value})} className="w-full px-3 py-2 rounded-xl border text-sm outline-none" style={{borderColor:'var(--border)'}}/></div></div>
        <div><label className="block text-xs mb-1" style={{color:'var(--text-muted)'}}>Email *</label><input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full px-3 py-2 rounded-xl border text-sm outline-none" style={{borderColor:'var(--border)'}}/></div>
        <div><label className="block text-xs mb-1" style={{color:'var(--text-muted)'}}>Select students *</label><div className="flex flex-wrap gap-2 p-3 rounded-xl border" style={{borderColor:'var(--border)'}}>{students.map(s=><button key={s.id} type="button" onClick={()=>setSel(p=>p.includes(s.id)?p.filter(x=>x!==s.id):[...p,s.id])} className="px-2 py-1 rounded-full text-xs font-medium" style={{background:sel.includes(s.id)?'var(--accent)':'var(--bg)',color:sel.includes(s.id)?'white':'var(--text-secondary)',border:'1px solid',borderColor:sel.includes(s.id)?'var(--accent)':'var(--border)'}}>{s.name}</button>)}</div></div>
        <div><label className="block text-xs mb-1" style={{color:'var(--text-muted)'}}>Message</label><textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})} rows={3} className="w-full px-3 py-2 rounded-xl border text-sm outline-none resize-none" style={{borderColor:'var(--border)'}}/></div>
        <button type="submit" disabled={!sel.length} className="w-full py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-40" style={{background:'var(--gradient-accent)'}}>Request Introduction ({sel.length} selected)</button>
      </form>}
    </div>
    <div className="rounded-2xl border p-8" style={{background:'var(--bg-card)',borderColor:'var(--border)'}}><h2 className="text-xl font-bold mb-2 text-center">End-of-Pilot Showcase</h2><p className="text-sm font-semibold text-center">📅 September 2, 2026 · Boston</p>
      {rsvpDone?<div className="text-center py-4 animate-scaleIn"><p className="text-2xl mb-2">✅</p><p className="text-sm font-semibold">You&apos;re on the list!</p></div>:
      <form onSubmit={submitRsvp} className="max-w-sm mx-auto space-y-3 mt-4">
        <input type="text" required placeholder="Your name" value={rsvp.name} onChange={e=>setRsvp({...rsvp,name:e.target.value})} className="w-full px-3 py-2 rounded-xl border text-sm outline-none" style={{borderColor:'var(--border)'}}/>
        <input type="email" required placeholder="Email" value={rsvp.email} onChange={e=>setRsvp({...rsvp,email:e.target.value})} className="w-full px-3 py-2 rounded-xl border text-sm outline-none" style={{borderColor:'var(--border)'}}/>
        <button type="submit" className="w-full py-2.5 rounded-xl text-sm font-semibold text-white" style={{background:'var(--gradient-cta)'}}>RSVP →</button>
      </form>}
    </div>
  </div></div>);
}
