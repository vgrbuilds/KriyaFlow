export default function HabitList({ habits, onUpdate, onDelete }) {
  if (!habits.length) return <p>No habits yet.</p>;

  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {habits.map((h) => (
        <li key={h._id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderBottom: '1px solid #eee' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600 }}>{h.name}</div>
            <div style={{ fontSize: 12, color: '#666' }}>
              Frequency: {h.frequency} • Streak: {h.streak ?? 0}
            </div>
          </div>
          <button onClick={() => onUpdate(h, { streak: (h.streak ?? 0) + 1 })}>+1 streak</button>
          <button onClick={() => onDelete(h)} style={{ color: '#b51c1c' }}>Delete</button>
        </li>
      ))}
    </ul>
  );
}