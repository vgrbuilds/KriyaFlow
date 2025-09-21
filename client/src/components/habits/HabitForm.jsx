import { useState } from 'react';

export default function HabitForm({ onAdd }) {
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState('daily');

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd({ name: name.trim(), frequency });
    setName('');
    setFrequency('daily');
  };

  return (
    <form onSubmit={submit} style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
      <input placeholder="Habit name" value={name} onChange={(e) => setName(e.target.value)} style={{ flex: 1, padding: 8 }} />
      <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
}