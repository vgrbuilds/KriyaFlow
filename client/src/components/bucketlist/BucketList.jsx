export default function BucketList({ items, onUpdate, onDelete }) {
  if (!items.length) return <p>No bucketlist items yet.</p>;

  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {items.map((b) => (
        <li key={b._id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderBottom: '1px solid #eee' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, textDecoration: b.isCompleted ? 'line-through' : 'none' }}>{b.title}</div>
            {b.description ? <div style={{ fontSize: 12 }}>{b.description}</div> : null}
            <div style={{ fontSize: 12, color: '#666' }}>
              {b.isCompleted && b.completedDate ? `Completed: ${new Date(b.completedDate).toLocaleDateString()}` : 'Not completed'}
            </div>
          </div>
          <button onClick={() => onUpdate(b, { isCompleted: !b.isCompleted, completedDate: !b.isCompleted ? new Date().toISOString() : undefined })}>
            Toggle Complete
          </button>
          <button onClick={() => onDelete(b)} style={{ color: '#b51c1c' }}>Delete</button>
        </li>
      ))}
    </ul>
  );
}