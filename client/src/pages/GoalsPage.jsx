import EntitiesPage from './EntitiesPage';
import GoalForm from '../components/goals/GoalForm';
import GoalList from '../components/goals/GoalList';

export default function GoalsPage() {
  return (
    <EntitiesPage
      title="Goals"
      path="/api/goals"
      Form={GoalForm}
      List={(props) => <GoalList goals={props.items} onUpdate={props.onUpdate} onDelete={props.onDelete} />}
    />
  );
}