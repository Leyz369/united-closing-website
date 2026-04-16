interface Props {
  pageName: string;
}

export default function PortalPlaceholder({ pageName }: Props) {
  const displayName = pageName.charAt(0).toUpperCase() + pageName.slice(1);

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{displayName}</h2>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="empty-state">
            <div className="empty-state-title">{displayName}</div>
            <div className="empty-state-text">Diese Seite wird noch eingerichtet.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
