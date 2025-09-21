import { useState } from 'react';

export default function BucketForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title: title.trim(), description: description || undefined });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={submit} style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} style={{ flex: 1, padding: 8 }} />
      <input placeholder="Description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} style={{ flex: 1, padding: 8 }} />
      <button type="submit">Add</button>
    </form>
  );
}