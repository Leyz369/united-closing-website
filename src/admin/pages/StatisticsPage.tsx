import { useState } from 'react';
import AdminHeader from './AdminHeader';
import { BarChart3, TrendingUp, Users, Zap, Flame, Target } from 'lucide-react';

const stats = [
  { label: 'Gesamt-Vertraege', value: '234', icon: BarChart3, color: '#7AA2FF' },
  { label: 'Diesen Monat', value: '18', icon: TrendingUp, color: '#2EE9C6' },
  { label: 'Aktive Partner', value: '12', icon: Users, color: '#A78BFA' },
  { label: 'Abschlussquote', value: '73%', icon: Target, color: '#fbbf24' },
];

const monthlyData = [
  { month: 'Okt', strom: 12, gas: 8 }, { month: 'Nov', strom: 15, gas: 10 },
  { month: 'Dez', strom: 9, gas: 7 }, { month: 'Jan', strom: 18, gas: 12 },
  { month: 'Feb', strom: 22, gas: 14 }, { month: 'Maer', strom: 25, gas: 16 },
];

export default function StatisticsPage() {
  return (
    <>
      <AdminHeader title="Statistiken" subtitle="Vertrags- und Partnerstatistiken" />
      <div style={{ padding: 'calc(var(--header-height) + 24px) 24px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="stat-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{s.label}</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)', marginTop: 4 }}>{s.value}</div>
                  </div>
                  <div style={{ width: 48, height: 48, borderRadius: 'var(--radius)', background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={20} style={{ color: s.color }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="card">
          <div className="card-header"><span className="card-title"><TrendingUp size={16} /> Vertraege nach Energieart</span></div>
          <div className="card-body">
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, height: 200 }}>
              {monthlyData.map((m, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: '100%', display: 'flex', gap: 3, alignItems: 'flex-end', height: 170 }}>
                    <div style={{ flex: 1, height: `${(m.strom / 30) * 100}%`, background: '#fcd34d', borderRadius: '3px 3px 0 0', minHeight: 4 }} title={`Strom: ${m.strom}`} />
                    <div style={{ flex: 1, height: `${(m.gas / 30) * 100}%`, background: '#fb923c', borderRadius: '3px 3px 0 0', minHeight: 4 }} title={`Gas: ${m.gas}`} />
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{m.month}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 24, justifyContent: 'center', marginTop: 16 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-secondary)' }}><Zap size={14} style={{ color: '#fcd34d' }} /> Strom</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-secondary)' }}><Flame size={14} style={{ color: '#fb923c' }} /> Gas</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
