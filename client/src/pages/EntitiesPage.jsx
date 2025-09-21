import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useApi } from '../lib/api';

// Reusable entity page factory to reduce repetitive code
export default function EntitiesPage({
  title,
  path,
  Form,
  List,
  mapCreatePayload = (p) => p,
}) {
  const { isSignedIn } = useUser();
  const api = useApi();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.get(path);
      setItems(data);
    } catch (e) {
      setError(e?.response?.data?.message || e.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSignedIn) load();
  }, [isSignedIn]);

  const createItem = async (payload) => {
    try {
      const created = await api.post(path, mapCreatePayload(payload));
      setItems((prev) => [created, ...prev]);
    } catch (e) {
      alert(e?.response?.data?.message || e.message || 'Create failed');
    }
  };

  const updateItem = async (item, patch) => {
    try {
      const updated = await api.put(`${path}/${item._id}`, patch);
      setItems((prev) => prev.map((x) => (x._id === item._id ? updated : x)));
    } catch (e) {
      alert(e?.response?.data?.message || e.message || 'Update failed');
    }
  };

  const deleteItem = async (item) => {
    try {
      await api.del(`${path}/${item._id}`);
      setItems((prev) => prev.filter((x) => x._id !== item._id));
    } catch (e) {
      alert(e?.response?.data?.message || e.message || 'Delete failed');
    }
  };

  if (!isSignedIn) return <p>Please sign in.</p>;

  return (
    <div style={{ maxWidth: 720, margin: '24px auto', padding: 16 }}>
      <h2 style={{ marginBottom: 12 }}>{title}</h2>
      {Form ? <Form onAdd={createItem} /> : null}
      {loading ? <p>Loading...</p> : <List items={items} events={items} habits={items} goals={items} onUpdate={updateItem} onDelete={deleteItem} />}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
    </div>
  );
}