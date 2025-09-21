import EntitiesPage from './EntitiesPage';
import TaskForm from '../components/tasks/TaskForm';
import TaskList from '../components/tasks/TaskList';

export default function TasksPage() {
  return (
    <EntitiesPage
      title="Tasks"
      path="/api/tasks"
      Form={TaskForm}
      List={(props) => <TaskList tasks={props.items} onToggleComplete={(t) => props.onUpdate(t, { isCompleted: !t.isCompleted })} onDelete={props.onDelete} />}
    />
  );
}