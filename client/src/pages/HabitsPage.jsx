import EntitiesPage from './EntitiesPage';
import HabitForm from '../components/habits/HabitForm';
import HabitList from '../components/habits/HabitList';

export default function HabitsPage() {
  return (
    <EntitiesPage
      title="Habits"
      path="/api/habits"
      Form={HabitForm}
      List={(props) => <HabitList habits={props.items} onUpdate={props.onUpdate} onDelete={props.onDelete} />}
    />
  );
}