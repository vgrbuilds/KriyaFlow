export default function GoalList({ goals, onUpdate, onDelete }) {
  if (!goals.length) return <p>No goals yet.</p>;

  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {goals.map((g) => (
        <li key={g._id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderBottom: '1px solid #eee' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600 }}>{g.title}</div>
            {g.description ? <div style={{ fontSize: 12 }}>{g.description}</div> : null}
            <div style={{ fontSize: 12, color: '#666' }}>
              Status: {g.status} {g.targetDate ? `• Target: ${new Date(g.targetDate).toLocaleDateString()}` : ''}
            </div>
          </div>
          <button onClick={() => onUpdate(g, { status: g.status === 'completed' ? 'in-progress' : 'completed' })}>
            Toggle Complete
          </button>
          <button onClick={() => onDelete(g)} style={{ color: '#b51c1c' }}>Delete</button>
        </li>
      ))}
    </ul>
  );
}