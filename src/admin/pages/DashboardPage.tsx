import { useState, useEffect } from 'react';
import AdminHeader from './AdminHeader';
import {
  Users, Sparkles, Calendar, Eye, MessageCircle, TrendingUp, ArrowUpRight, Mail, Phone,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  lead_tier: string;
  video_watched: boolean;
  cal_booked: boolean;
  agent_conversation_id: string | null;
  agent_summary: string | null;
  created_at: string;
}

type PeriodType = 'today' | 'week' | 'month' | 'all';

const PERIOD_DAYS: Record<PeriodType, number | null> = {
  today: 1,
  week: 7,
  month: 30,
  all: null,
};

export default function DashboardPage() {
  const [period, setPeriod] = useState<PeriodType>('week');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const { data } = await supabase
      .from('contact_submissions')
      .select('id, name, email, phone, lead_tier, video_watched, cal_booked, agent_conversation_id, agent_summary, created_at')
      .order('created_at', { ascending: false });
    if (data) setLeads(data as Lead[]);
    setLoading(false);
  }

  const periodDays = PERIOD_DAYS[period];
  const now = Date.now();
  const filteredLeads = periodDays === null
    ? leads
    : leads.filter((l) => (now - new Date(l.created_at).getTime()) / 86_400_000 <= periodDays);

  const total = filteredLeads.length;
  const newLeads = filteredLeads.filter((l) => l.lead_tier === 'neu').length;
  const qualified = filteredLeads.filter((l) => l.lead_tier === 'qualifiziert').length;
  const bookedTermin = filteredLeads.filter((l) => l.lead_tier === 'termin_gebucht').length;
  const videoWatched = filteredLeads.filter((l) => l.video_watched).length;
  const agentTalked = filteredLeads.filter((l) => l.agent_conversation_id).length;

  const conversionRate = total > 0 ? Math.round((bookedTermin / total) * 100) : 0;
  const videoRate = total > 0 ? Math.round((videoWatched / total) * 100) : 0;
  const agentRate = total > 0 ? Math.round((agentTalked / total) * 100) : 0;

  // Daily leads for last 7 days
  const dailyLeads = Array.from({ length: 7 }).map((_, i) => {
    const dayStart = new Date();
    dayStart.setDate(dayStart.getDate() - (6 - i));
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(dayStart);
    dayEnd.setHours(23, 59, 59, 999);
    const count = leads.filter((l) => {
      const t = new Date(l.created_at).getTime();
      return t >= dayStart.getTime() && t <= dayEnd.getTime();
    }).length;
    return { day: dayStart.toLocaleDateString('de-DE', { weekday: 'short' }), count };
  });
  const maxDaily = Math.max(...dailyLeads.map((d) => d.count), 1);

  const recentLeads = filteredLeads.slice(0, 6);

  const stats = [
    { label: 'Leads gesamt', value: String(total), icon: Users, accent: '#7AA2FF', sub: `${newLeads} neu` },
    { label: 'Qualifiziert', value: String(qualified), icon: Sparkles, accent: '#A78BFA', sub: `${agentRate}% durch Vito` },
    { label: 'Termine gebucht', value: String(bookedTermin), icon: Calendar, accent: '#2EE9C6', sub: `${conversionRate}% Conversion` },
    { label: 'Video-Views', value: String(videoWatched), icon: Eye, accent: '#fbbf24', sub: `${videoRate}% der Leads` },
  ];

  const s: Record<string, React.CSSProperties> = {
    page: { padding: 'calc(var(--header-height) + 24px) 24px 24px' },
    periodBar: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
    periodSelector: { display: 'flex', gap: 4, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 4 },
    periodBtn: { padding: '6px 16px', borderRadius: 'var(--radius-sm)', border: 'none', background: 'transparent', color: 'var(--text-secondary)', fontSize: 13, fontWeight: 500, cursor: 'pointer' },
    periodBtnActive: { background: 'var(--primary)', color: '#0a1628' },
    heroGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 },
    heroCard: { background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20 },
    twoCol: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 },
  };

  return (
    <>
      <AdminHeader title="Dashboard" subtitle="Lead-Funnel Uebersicht & Performance" />
      <div style={s.page}>
        {/* Period Selector */}
        <div style={s.periodBar}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 16, fontWeight: 600, color: 'var(--text-heading)' }}>
            <TrendingUp size={18} /> Zeitraum
          </div>
          <div style={s.periodSelector}>
            {([
              { key: 'today', label: 'Heute' },
              { key: 'week', label: '7 Tage' },
              { key: 'month', label: '30 Tage' },
              { key: 'all', label: 'Gesamt' },
            ] as const).map((p) => (
              <button
                key={p.key}
                style={{ ...s.periodBtn, ...(period === p.key ? s.periodBtnActive : {}) }}
                onClick={() => setPeriod(p.key)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Hero Stats */}
        <div style={s.heroGrid}>
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} style={s.heroCard}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: `${stat.accent}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.accent }}>
                    <Icon size={20} />
                  </div>
                </div>
                <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{stat.value}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{stat.label}</div>
                <div style={{ fontSize: 11, color: stat.accent, marginTop: 6 }}>{stat.sub}</div>
              </div>
            );
          })}
        </div>

        {/* Charts + Recent Leads */}
        <div style={s.twoCol}>
          {/* Daily Leads Chart */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-heading)', marginBottom: 4 }}>Leads der letzten 7 Tage</h3>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20 }}>
              {leads.filter((l) => (now - new Date(l.created_at).getTime()) / 86_400_000 <= 7).length} Leads gesamt
            </p>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 180, padding: '10px 0' }}>
              {dailyLeads.map((d, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)' }}>{d.count}</div>
                  <div
                    style={{
                      width: '100%',
                      height: `${(d.count / maxDaily) * 140}px`,
                      minHeight: 2,
                      background: 'linear-gradient(180deg, #7AA2FF 0%, #A78BFA 100%)',
                      borderRadius: 6,
                      transition: 'all 0.3s',
                    }}
                  />
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{d.day}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Funnel */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-heading)', marginBottom: 4 }}>Conversion-Funnel</h3>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20 }}>
              Wie viele Leads durchlaufen jeden Schritt
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <FunnelBar label="Formular ausgefüllt" count={total} total={total} color="#7AA2FF" icon={<Users size={14} />} />
              <FunnelBar label="Video angesehen" count={videoWatched} total={total} color="#fbbf24" icon={<Eye size={14} />} />
              <FunnelBar label="Mit Vito gesprochen" count={agentTalked} total={total} color="#A78BFA" icon={<MessageCircle size={14} />} />
              <FunnelBar label="Termin gebucht" count={bookedTermin} total={total} color="#2EE9C6" icon={<Calendar size={14} />} />
            </div>
          </div>
        </div>

        {/* Recent Leads */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20, marginTop: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-heading)' }}>Neueste Leads</h3>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Die letzten 6 Bewerbungen</p>
            </div>
            <a
              href="/admin/leads"
              onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/admin/leads'); window.dispatchEvent(new PopStateEvent('popstate')); }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#7AA2FF', textDecoration: 'none' }}
            >
              Alle anzeigen <ArrowUpRight size={12} />
            </a>
          </div>
          {loading ? (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 20 }}>Laedt...</div>
          ) : recentLeads.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 40 }}>
              Noch keine Leads. Die ersten Bewerbungen erscheinen hier sobald sie eingehen.
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr><th>Name</th><th>Kontakt</th><th>Status</th><th>Progress</th><th>Datum</th></tr>
              </thead>
              <tbody>
                {recentLeads.map((lead) => (
                  <tr key={lead.id}>
                    <td style={{ fontWeight: 600 }}>{lead.name}</td>
                    <td style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                      <div>{lead.email}</div>
                      {lead.phone && <div>{lead.phone}</div>}
                    </td>
                    <td>
                      <TierBadge tier={lead.lead_tier} />
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <Eye size={14} style={{ color: lead.video_watched ? '#2EE9C6' : 'rgba(255,255,255,0.15)' }} />
                        <MessageCircle size={14} style={{ color: lead.agent_conversation_id ? '#A78BFA' : 'rgba(255,255,255,0.15)' }} />
                        <Calendar size={14} style={{ color: lead.cal_booked ? '#2EE9C6' : 'rgba(255,255,255,0.15)' }} />
                      </div>
                    </td>
                    <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                      {new Date(lead.created_at).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

function FunnelBar({ label, count, total, color, icon }: { label: string; count: number; total: number; color: string; icon: React.ReactNode }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
          <span style={{ color }}>{icon}</span> {label}
        </div>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>
          {count} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({Math.round(pct)}%)</span>
        </div>
      </div>
      <div style={{ height: 8, background: 'rgba(255,255,255,0.05)', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 4, transition: 'width 0.4s' }} />
      </div>
    </div>
  );
}

function TierBadge({ tier }: { tier: string }) {
  const cfg: Record<string, { label: string; color: string; bg: string }> = {
    neu: { label: 'Neu', color: '#3B82F6', bg: 'rgba(59,130,246,0.12)' },
    qualifiziert: { label: 'Qualifiziert', color: '#A78BFA', bg: 'rgba(167,139,250,0.12)' },
    termin_gebucht: { label: 'Termin', color: '#2EE9C6', bg: 'rgba(46,233,198,0.12)' },
    kontaktiert: { label: 'Kontaktiert', color: '#D4A017', bg: 'rgba(212,160,23,0.12)' },
  };
  const c = cfg[tier] || cfg.neu;
  return (
    <span style={{ display: 'inline-flex', padding: '3px 8px', borderRadius: 5, fontSize: 10, fontWeight: 600, color: c.color, background: c.bg }}>
      {c.label}
    </span>
  );
}
