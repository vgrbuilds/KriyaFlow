import React from 'react';

export default function TaskList({ tasks, onToggleComplete, onDelete }) {
  if (!tasks.length) return <p>No tasks yet.</p>;

  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {tasks.map((t) => (
        <li key={t._id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderBottom: '1px solid #eee' }}>
          <input
            type="checkbox"
            checked={Boolean(t.isCompleted)}
            onChange={() => onToggleComplete(t)}
            aria-label={`toggle ${t.text}`}
          />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, textDecoration: t.isCompleted ? 'line-through' : 'none' }}>{t.text}</div>
            <div style={{ fontSize: 12, color: '#666' }}>
              Priority: {t.priority} {t.dueDate ? `• Due: ${new Date(t.dueDate).toLocaleDateString()}` : ''}
            </div>
          </div>
          <button onClick={() => onDelete(t)} style={{ color: '#b51c1c' }}>Delete</button>
        </li>
      ))}
    </ul>
  );
}