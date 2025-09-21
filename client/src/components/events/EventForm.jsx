import { useState } from 'react';

export default function EventForm({ onAdd }) {
  const [name, setName] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !start || !end) return;
    onAdd({
      name: name.trim(),
      start: new Date(start).toISOString(),
      end: new Date(end).toISOString(),
      location: location || undefined,
      notes: notes || undefined,
    });
    setName('');
    setStart('');
    setEnd('');
    setLocation('');
    setNotes('');
  };

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
      <input placeholder="Event name" value={name} onChange={(e) => setName(e.target.value)} style={{ flex: 1, padding: 8 }} />
      <input type="datetime-local" value={start} onChange={(e) => setStart(e.target.value)} />
      <input type="datetime-local" value={end} onChange={(e) => setEnd(e.target.value)} />
      <input placeholder="Location (optional)" value={location} onChange={(e) => setLocation(e.target.value)} />
      <input placeholder="Notes (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
}