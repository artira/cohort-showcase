'use client';

import Nav from '@/components/Nav';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function PartnersPage() {
  const [formData, setFormData] = useState({ partner_name: '', company: '', email: '', message: '' });
  const [students, setStudents] = useState<{ id: string; name: string }[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [rsvpData, setRsvpData] = useState({ name: '', email: '', company: '', role: '' });
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  useEffect(() => {
    supabase.from('students').select('id, name').eq('is_public', true).order('name').then(({ data }) => { if (data) setStudents(data); });
  }, []);

  async function handleIntroRequest(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.partner_name || !formData.company || !formData.email || selectedStudents.length === 0) return;
    await supabase.from('intro_requests').insert({ ...formData, student_ids: selectedStudents });
    setSubmitted(true);
  }

  async function handleRsvp(e: React.FormEvent) {
    e.preventDefault();
    if (!rsvpData.name || !rsvpData.email) return;
    await supabase.from('event_rsvps').insert(rsvpData);
    setRsvpSubmitted(true);
  }

  return (
    <div style={{ background: 'var(--bg)' }}>
      <Nav />
      <div className="pt-20 pb-16 px-4 max-w-4xl mx-auto">

        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold mb-3">Hire From This Cohort</h1>
          <p className="text-sm max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Production-ready developers you can evaluate entirely on GitHub. Every review, deployment, and merged PR is public. You pay only when you hire.
          </p>
        </div>

        {/* How it works */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { step: '1', title: 'Browse & Evaluate', desc: 'Review student profiles, GitHub contributions, deployed projects, and peer reviews — all public.', emoji: '🔍' },
            { step: '2', title: 'Request Intro', desc: 'Submit an intro request for specific students. Our placement team connects you within 48 hours.', emoji: '🤝' },
            { step: '3', title: 'Hire & Pay', desc: '25% of first-year base salary on successful hire. 90-day clawback. 10% kickback to candidate.', emoji: '✅' },
          ].map(s => (
            <div key={s.step} className="rounded-2xl border p-6 text-center" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mx-auto mb-3" style={{ background: 'var(--accent-light)' }}>{s.emoji}</div>
              <p className="text-[10px] font-semibold uppercase mb-1" style={{ color: 'var(--accent)' }}>Step {s.step}</p>
              <h3 className="text-sm font-bold mb-2">{s.title}</h3>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* What you get */}
        <div className="rounded-2xl border p-8 mb-16" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
          <h2 className="text-xl font-bold mb-4 text-center">What You Get</h2>
          <div className="grid md:grid-cols-2 gap-4 text-xs" style={{ color: 'var(--text-secondary)' }}>
            {[
              '6 weeks of observable, production-quality work',
              'Public peer reviews on every submission',
              'Deployed applications you can test yourself',
              'GitHub commit history and PR contributions',
              'Open source contribution evidence',
              'Cohort showcase with searchable profiles',
              'Direct intro to specific students',
              'No upfront cost — pay only on hire',
            ].map(item => (
              <div key={item} className="flex items-start gap-2">
                <span style={{ color: 'var(--success)' }}>✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Fee model */}
        <div className="rounded-2xl p-8 mb-16 text-center text-white" style={{ background: 'var(--gradient-hero)' }}>
          <h2 className="text-xl font-bold mb-4">Fee Model</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div><p className="text-3xl font-black">25%</p><p className="text-xs mt-1 opacity-70">of first-year base salary</p></div>
            <div><p className="text-3xl font-black">90 days</p><p className="text-xs mt-1 opacity-70">clawback period</p></div>
            <div><p className="text-3xl font-black">10%</p><p className="text-xs mt-1 opacity-70">kickback to candidate</p></div>
          </div>
          <p className="text-xs mt-6 opacity-60 max-w-md mx-auto">
            At a $200k hire → $50k fee. Comparable agency fee: 20–30% with significantly less signal on candidate quality.
          </p>
        </div>

        {/* Intro request form */}
        <div id="contact" className="rounded-2xl border p-8 mb-16" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
          <h2 className="text-xl font-bold mb-2 text-center">Request an Introduction</h2>
          <p className="text-xs text-center mb-6" style={{ color: 'var(--text-muted)' }}>Select students you're interested in and we'll connect you within 48 hours.</p>

          {submitted ? (
            <div className="text-center py-8 animate-scaleIn">
              <p className="text-4xl mb-3">🎉</p>
              <p className="text-base font-bold mb-1">Request received!</p>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Our placement team will reach out within 48 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleIntroRequest} className="space-y-4 max-w-lg mx-auto">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Your name *</label>
                  <input type="text" required value={formData.partner_name} onChange={e => setFormData({ ...formData, partner_name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border text-sm outline-none" style={{ borderColor: 'var(--border)' }} />
                </div>
                <div>
                  <label className="block text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Company *</label>
                  <input type="text" required value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border text-sm outline-none" style={{ borderColor: 'var(--border)' }} />
                </div>
              </div>
              <div>
                <label className="block text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Email *</label>
                <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border text-sm outline-none" style={{ borderColor: 'var(--border)' }} />
              </div>
              <div>
                <label className="block text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Select students *</label>
                <div className="flex flex-wrap gap-2 p-3 rounded-xl border" style={{ borderColor: 'var(--border)' }}>
                  {students.map(s => (
                    <button key={s.id} type="button" onClick={() => setSelectedStudents(prev => prev.includes(s.id) ? prev.filter(x => x !== s.id) : [...prev, s.id])}
                      className="px-2 py-1 rounded-full text-xs font-medium transition-colors"
                      style={{ background: selectedStudents.includes(s.id) ? 'var(--accent)' : 'var(--bg)', color: selectedStudents.includes(s.id) ? 'white' : 'var(--text-secondary)', border: '1px solid', borderColor: selectedStudents.includes(s.id) ? 'var(--accent)' : 'var(--border)' }}>
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Message (optional)</label>
                <textarea value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} rows={3}
                  className="w-full px-3 py-2 rounded-xl border text-sm outline-none resize-none" style={{ borderColor: 'var(--border)' }}
                  placeholder="What roles are you hiring for?" />
              </div>
              <button type="submit" disabled={selectedStudents.length === 0}
                className="w-full py-3 rounded-xl text-sm font-semibold text-white hover:scale-[1.02] transition-transform disabled:opacity-40"
                style={{ background: 'var(--gradient-accent)' }}>
                Request Introduction ({selectedStudents.length} selected)
              </button>
            </form>
          )}
        </div>

        {/* Event RSVP */}
        <div className="rounded-2xl border p-8" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
          <h2 className="text-xl font-bold mb-2 text-center">End-of-Pilot Showcase</h2>
          <p className="text-xs text-center mb-6" style={{ color: 'var(--text-muted)' }}>
            Join us for live demos, meet the cohort, and see 8 weeks of production work in person.
          </p>
          <div className="text-center mb-6">
            <p className="text-sm font-semibold">📅 September 2, 2026</p>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Boston · Details TBA</p>
          </div>

          {rsvpSubmitted ? (
            <div className="text-center py-4 animate-scaleIn">
              <p className="text-2xl mb-2">✅</p>
              <p className="text-sm font-semibold">You're on the list!</p>
            </div>
          ) : (
            <form onSubmit={handleRsvp} className="max-w-sm mx-auto space-y-3">
              <input type="text" required placeholder="Your name" value={rsvpData.name} onChange={e => setRsvpData({ ...rsvpData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border text-sm outline-none" style={{ borderColor: 'var(--border)' }} />
              <input type="email" required placeholder="Email" value={rsvpData.email} onChange={e => setRsvpData({ ...rsvpData, email: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border text-sm outline-none" style={{ borderColor: 'var(--border)' }} />
              <input type="text" placeholder="Company (optional)" value={rsvpData.company} onChange={e => setRsvpData({ ...rsvpData, company: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border text-sm outline-none" style={{ borderColor: 'var(--border)' }} />
              <button type="submit" className="w-full py-2.5 rounded-xl text-sm font-semibold text-white hover:scale-[1.02] transition-transform"
                style={{ background: 'var(--gradient-cta)' }}>
                RSVP →
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
