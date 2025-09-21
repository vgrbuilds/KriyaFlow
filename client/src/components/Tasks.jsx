import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useApi } from '../lib/api';
import TaskForm from './tasks/TaskForm';
import TaskList from './tasks/TaskList';

export default function Tasks() {
  const { isSignedIn } = useUser();
  const api = useApi();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.get('/api/tasks');
      setTasks(data);
    } catch (e) {
      setError(e?.response?.data?.message || e.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      load();
    }
  }, [isSignedIn]);

  const addTask = async (payload) => {
    try {
      const created = await api.post('/api/tasks', payload);
      setTasks((prev) => [created, ...prev]);
    } catch (e) {
      alert(e?.response?.data?.message || e.message || 'Failed to add task');
    }
  };

  const toggleComplete = async (task) => {
    try {
      const updated = await api.put(`/api/tasks/${task._id}`, { isCompleted: !task.isCompleted });
      setTasks((prev) => prev.map((t) => (t._id === task._id ? updated : t)));
    } catch (e) {
      alert(e?.response?.data?.message || e.message || 'Failed to update task');
    }
  };

  const removeTask = async (task) => {
    try {
      await api.del(`/api/tasks/${task._id}`);
      setTasks((prev) => prev.filter((t) => t._id !== task._id));
    } catch (e) {
      alert(e?.response?.data?.message || e.message || 'Failed to delete task');
    }
  };

  if (!isSignedIn) return <p>Please sign in to manage tasks.</p>;

  return (
    <div style={{ maxWidth: 640, margin: '24px auto', padding: 16 }}>
      <h2 style={{ marginBottom: 12 }}>Tasks</h2>
      <TaskForm onAdd={addTask} />
      {loading ? <p>Loading...</p> : <TaskList tasks={tasks} onToggleComplete={toggleComplete} onDelete={removeTask} />}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
    </div>
  );
}