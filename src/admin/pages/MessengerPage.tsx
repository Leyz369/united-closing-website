import AdminHeader from './AdminHeader';
import { MessageCircle, Send } from 'lucide-react';
import { useState } from 'react';

const demoGroups = [
  { id: '1', name: 'United Closing Q1', members: 8, lastMessage: 'Neuer Vertrag abgeschlossen!' },
  { id: '2', name: 'Gas Offensive', members: 5, lastMessage: 'Wer hat heute noch Termine?' },
  { id: '3', name: 'Telko Expansion', members: 3, lastMessage: 'Kampagne laeuft super' },
];

const demoMessages = [
  { id: '1', sender: 'Max Hopff', text: 'Habe gerade 3 neue Vertraege abgeschlossen!', time: '14:23', isMe: false },
  { id: '2', sender: 'Sarah Weber', text: 'Super Leistung, Max! Weiter so!', time: '14:25', isMe: false },
  { id: '3', sender: 'Du', text: 'Glueckwunsch an alle! Weiter so, Team!', time: '14:30', isMe: true },
];

export default function MessengerPage() {
  const [activeGroup, setActiveGroup] = useState(demoGroups[0]);
  const [newMessage, setNewMessage] = useState('');

  return (
    <>
      <AdminHeader title="Messenger" subtitle="Team-Kommunikation" />
      <div style={{ padding: 'calc(var(--header-height) + 24px) 24px 24px', display: 'flex', gap: 24, height: 'calc(100vh - var(--header-height) - 48px)' }}>
        {/* Groups */}
        <div style={{ width: 280, flexShrink: 0, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
          <div style={{ padding: 16, borderBottom: '1px solid var(--border)', fontWeight: 600, color: 'var(--text-heading)' }}>Gruppen</div>
          {demoGroups.map(g => (
            <button key={g.id} onClick={() => setActiveGroup(g)} style={{
              width: '100%', padding: '14px 16px', background: activeGroup.id === g.id ? 'rgba(122,162,255,0.08)' : 'transparent',
              border: 'none', borderBottom: '1px solid var(--border)', cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font)',
            }}>
              <div style={{ fontWeight: 600, color: activeGroup.id === g.id ? 'var(--primary)' : 'var(--text)', fontSize: 14 }}>{g.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{g.members} Mitglieder - {g.lastMessage}</div>
            </button>
          ))}
        </div>

        {/* Chat */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
          <div style={{ padding: 16, borderBottom: '1px solid var(--border)', fontWeight: 600, color: 'var(--text-heading)' }}>
            <MessageCircle size={16} style={{ display: 'inline', marginRight: 8 }} />{activeGroup.name}
          </div>
          <div style={{ flex: 1, padding: 16, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {demoMessages.map(m => (
              <div key={m.id} style={{ display: 'flex', flexDirection: 'column', alignItems: m.isMe ? 'flex-end' : 'flex-start' }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>{m.sender} - {m.time}</div>
                <div style={{ padding: '10px 14px', borderRadius: 'var(--radius)', background: m.isMe ? 'var(--primary)' : 'var(--bg-light)', color: m.isMe ? '#0a1628' : 'var(--text)', maxWidth: '60%', fontSize: 14 }}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: 16, borderTop: '1px solid var(--border)', display: 'flex', gap: 12 }}>
            <input className="input" placeholder="Nachricht schreiben..." value={newMessage} onChange={e => setNewMessage(e.target.value)} style={{ flex: 1 }} />
            <button className="btn-primary" style={{ padding: '0.5rem 1rem' }}><Send size={16} /></button>
          </div>
        </div>
      </div>
    </>
  );
}
