import { useState, useEffect } from 'react';
import AdminHeader from './AdminHeader';
import { Search, Mail, Phone, Eye, MessageCircle, Calendar, Sparkles } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  availability: string;
  goals: string;
  status: string;
  lead_tier: string;
  quiz_score: number | null;
  agent_conversation_id: string | null;
  agent_summary: string | null;
  experience: string | null;
  hours_per_week: string | null;
  income_goal: string | null;
  start_date: string | null;
  motivation: string | null;
  video_watched: boolean;
  cal_booked: boolean;
  created_at: string;
}

const TIER_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  neu: { label: 'Neu', color: '#3B82F6', bg: 'rgba(59,130,246,0.12)' },
  qualifiziert: { label: 'Qualifiziert', color: '#A78BFA', bg: 'rgba(167,139,250,0.12)' },
  termin_gebucht: { label: 'Termin gebucht', color: '#2EE9C6', bg: 'rgba(46,233,198,0.12)' },
  kontaktiert: { label: 'Kontaktiert', color: '#D4A017', bg: 'rgba(212,160,23,0.12)' },
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    loadLeads();
  }, []);

  async function loadLeads() {
    setLoading(true);
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      console.error('Error loading leads:', error);
    } else {
      setLeads(data as Lead[]);
    }
    setLoading(false);
  }

  async function updateLeadStatus(leadId: string, newTier: string) {
    const { error } = await supabase
      .from('contact_submissions')
      .update({ lead_tier: newTier })
      .eq('id', leadId);
    if (!error) {
      setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, lead_tier: newTier } : l)));
      if (selectedLead?.id === leadId) {
        setSelectedLead({ ...selectedLead, lead_tier: newTier });
      }
    }
  }

  const filteredLeads = leads.filter((l) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q) || l.phone.includes(searchQuery);
    const matchesTier = tierFilter === 'all' || l.lead_tier === tierFilter;
    return matchesSearch && matchesTier;
  });

  const tierCounts = leads.reduce((acc, l) => {
    acc[l.lead_tier] = (acc[l.lead_tier] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <AdminHeader title="Leads" subtitle={`${leads.length} Bewerbungen insgesamt — ${tierCounts.neu || 0} neu, ${tierCounts.qualifiziert || 0} qualifiziert`} />
      <div style={{ padding: 'calc(var(--header-height) + 24px) 24px 24px' }}>
        {/* Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ position: 'relative', width: 300 }}>
              <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>
                <Search size={14} />
              </span>
              <input
                type="text"
                placeholder="Name, E-Mail oder Telefon..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input"
                style={{ paddingLeft: 40 }}
              />
            </div>
            <select value={tierFilter} onChange={(e) => setTierFilter(e.target.value)} className="select" style={{ width: 200 }}>
              <option value="all">Alle Status</option>
              <option value="neu">Neu ({tierCounts.neu || 0})</option>
              <option value="qualifiziert">Qualifiziert ({tierCounts.qualifiziert || 0})</option>
              <option value="termin_gebucht">Termin gebucht ({tierCounts.termin_gebucht || 0})</option>
              <option value="kontaktiert">Kontaktiert ({tierCounts.kontaktiert || 0})</option>
            </select>
          </div>
          <button onClick={loadLeads} className="btn-primary">
            Aktualisieren
          </button>
        </div>

        {/* Tier Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
          {(['neu', 'qualifiziert', 'termin_gebucht', 'kontaktiert'] as const).map((tier) => {
            const cfg = TIER_CONFIG[tier];
            return (
              <div key={tier} className="card" style={{ padding: 16, cursor: 'pointer', borderLeft: `3px solid ${cfg.color}` }} onClick={() => setTierFilter(tier)}>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 6 }}>{cfg.label}</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: cfg.color }}>{tierCounts[tier] || 0}</div>
              </div>
            );
          })}
        </div>

        {/* Leads Table */}
        {loading ? (
          <div className="card" style={{ padding: 40, textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>Laedt...</div>
        ) : filteredLeads.length === 0 ? (
          <div className="card" style={{ padding: 40, textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
            Keine Leads gefunden
          </div>
        ) : (
          <div className="card">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Kontakt</th>
                  <th>Status</th>
                  <th>Progress</th>
                  <th>Eingegangen</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => {
                  const cfg = TIER_CONFIG[lead.lead_tier] || TIER_CONFIG.neu;
                  return (
                    <tr key={lead.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedLead(lead)}>
                      <td>
                        <div style={{ fontWeight: 600, color: '#e2e8f0' }}>{lead.name}</div>
                        {lead.agent_summary && (
                          <div style={{ fontSize: 11, color: '#A78BFA', marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Sparkles size={10} /> Von Vito qualifiziert
                          </div>
                        )}
                      </td>
                      <td>
                        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Mail size={11} /> {lead.email}</div>
                          {lead.phone && <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}><Phone size={11} /> {lead.phone}</div>}
                        </div>
                      </td>
                      <td>
                        <span style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, color: cfg.color, background: cfg.bg }}>
                          {cfg.label}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: 8, fontSize: 10 }}>
                          <span title="Video angesehen" style={{ color: lead.video_watched ? '#2EE9C6' : 'rgba(255,255,255,0.2)' }}>
                            <Eye size={14} />
                          </span>
                          <span title="Agent-Gespraech" style={{ color: lead.agent_conversation_id ? '#A78BFA' : 'rgba(255,255,255,0.2)' }}>
                            <MessageCircle size={14} />
                          </span>
                          <span title="Termin gebucht" style={{ color: lead.cal_booked ? '#2EE9C6' : 'rgba(255,255,255,0.2)' }}>
                            <Calendar size={14} />
                          </span>
                        </div>
                      </td>
                      <td style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{formatDate(lead.created_at)}</td>
                      <td>
                        <button className="btn-secondary" style={{ padding: '4px 10px', fontSize: 11 }} onClick={(e) => { e.stopPropagation(); setSelectedLead(lead); }}>
                          Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedLead && (
        <div onClick={() => setSelectedLead(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: '#1a1f24', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, width: '100%', maxWidth: 640, maxHeight: '85vh', overflow: 'auto' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#e2e8f0' }}>{selectedLead.name}</h3>
                <p style={{ margin: '4px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Lead-Details</p>
              </div>
              <button onClick={() => setSelectedLead(null)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: 20 }}>×</button>
            </div>
            <div style={{ padding: 24 }}>
              {/* Status Update */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 8, display: 'block' }}>Status aendern</label>
                <select value={selectedLead.lead_tier} onChange={(e) => updateLeadStatus(selectedLead.id, e.target.value)} className="select" style={{ width: '100%' }}>
                  <option value="neu">Neu</option>
                  <option value="qualifiziert">Qualifiziert</option>
                  <option value="termin_gebucht">Termin gebucht</option>
                  <option value="kontaktiert">Kontaktiert</option>
                </select>
              </div>

              {/* Kontaktdaten */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                <Field label="E-Mail" value={selectedLead.email} />
                <Field label="Telefon" value={selectedLead.phone || '—'} />
                <Field label="Verfuegbarkeit" value={selectedLead.availability} />
                <Field label="Eingegangen" value={formatDate(selectedLead.created_at)} />
              </div>

              {/* Agent-Daten */}
              {(selectedLead.agent_summary || selectedLead.experience || selectedLead.hours_per_week) && (
                <div style={{ padding: 16, borderRadius: 12, background: 'rgba(167,139,250,0.06)', border: '1px solid rgba(167,139,250,0.15)', marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, color: '#A78BFA', fontSize: 12, fontWeight: 600 }}>
                    <Sparkles size={14} /> Vito KI-Qualifizierung
                  </div>
                  {selectedLead.experience && <Field label="Erfahrung" value={selectedLead.experience} />}
                  {selectedLead.hours_per_week && <Field label="Stunden/Woche" value={selectedLead.hours_per_week} />}
                  {selectedLead.income_goal && <Field label="Einkommensziel" value={selectedLead.income_goal} />}
                  {selectedLead.start_date && <Field label="Start" value={selectedLead.start_date} />}
                  {selectedLead.motivation && <Field label="Motivation" value={selectedLead.motivation} />}
                  {selectedLead.agent_summary && (
                    <div style={{ marginTop: 12, padding: 12, background: 'rgba(0,0,0,0.2)', borderRadius: 8, fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                      {selectedLead.agent_summary}
                    </div>
                  )}
                </div>
              )}

              {/* Progress Flags */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <Flag active={selectedLead.video_watched} label="Video angesehen" icon={<Eye size={12} />} />
                <Flag active={!!selectedLead.agent_conversation_id} label="Agent-Gespraech" icon={<MessageCircle size={12} />} />
                <Flag active={selectedLead.cal_booked} label="Termin gebucht" icon={<Calendar size={12} />} />
              </div>

              {/* Quick Actions */}
              <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
                <a href={`mailto:${selectedLead.email}`} className="btn-primary" style={{ flex: 1, textAlign: 'center', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <Mail size={14} /> E-Mail schreiben
                </a>
                {selectedLead.phone && (
                  <a href={`tel:${selectedLead.phone}`} className="btn-secondary" style={{ flex: 1, textAlign: 'center', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                    <Phone size={14} /> Anrufen
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 13, color: '#e2e8f0' }}>{value}</div>
    </div>
  );
}

function Flag({ active, label, icon }: { active: boolean; label: string; icon: React.ReactNode }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '6px 12px', borderRadius: 999, fontSize: 11, fontWeight: 600,
      color: active ? '#2EE9C6' : 'rgba(255,255,255,0.3)',
      background: active ? 'rgba(46,233,198,0.1)' : 'rgba(255,255,255,0.03)',
      border: `1px solid ${active ? 'rgba(46,233,198,0.2)' : 'rgba(255,255,255,0.05)'}`,
    }}>
      {icon} {label}
    </span>
  );
}
