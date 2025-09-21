export default function EventList({ events, onUpdate, onDelete }) {
  if (!events.length) return <p>No events yet.</p>;

  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {events.map((e) => (
        <li key={e._id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderBottom: '1px solid #eee' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600 }}>{e.name}</div>
            <div style={{ fontSize: 12, color: '#666' }}>
              {new Date(e.start).toLocaleString()} → {new Date(e.end).toLocaleString()}
              {e.location ? ` • ${e.location}` : ''}
            </div>
            {e.notes ? <div style={{ fontSize: 12 }}>{e.notes}</div> : null}
          </div>
          <button onClick={() => onDelete(e)} style={{ color: '#b51c1c' }}>Delete</button>
        </li>
      ))}
    </ul>
  );
}