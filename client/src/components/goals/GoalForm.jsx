import { useState } from 'react';

export default function GoalForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('in-progress');
  const [targetDate, setTargetDate] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({
      title: title.trim(),
      description: description || undefined,
      status,
      targetDate: targetDate ? new Date(targetDate).toISOString() : undefined,
    });
    setTitle('');
    setDescription('');
    setStatus('in-progress');
    setTargetDate('');
  };

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} style={{ flex: 1, padding: 8 }} />
      <input placeholder="Description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} style={{ flex: 1, padding: 8 }} />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="in-progress">In progress</option>
        <option value="completed">Completed</option>
        <option value="on-hold">On hold</option>
      </select>
      <input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
}